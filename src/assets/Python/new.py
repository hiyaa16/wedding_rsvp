from transformers import (
    AutoModelForCausalLM, AutoTokenizer,
    Trainer, TrainingArguments, DataCollatorForLanguageModeling
)
from datasets import load_dataset, Dataset
from peft import LoraConfig, get_peft_model
import torch
import json

# =====================================================
# STEP 1: Load Model + Tokenizer
# =====================================================
model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Fix: GPT models don’t have pad_token
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.add_special_tokens({'pad_token': tokenizer.pad_token})

model = AutoModelForCausalLM.from_pretrained(model_name)
model.resize_token_embeddings(len(tokenizer))

# =====================================================
# STEP 2: Load DailyDialog Dataset
# =====================================================
dataset = load_dataset("daily_dialog", trust_remote_code=True)

# Convert conversations into prompt → completion pairs
def convert_to_prompt_completion(example):
    dialogues = example["dialog"]
    pairs = []
    for i in range(len(dialogues) - 1):
        prompt = f"User: {dialogues[i]}\nBot:"
        completion = f" {dialogues[i+1]}"
        pairs.append({"prompt": prompt, "completion": completion})
    return pairs

flat_dataset = []
for ex in dataset["train"]:
    flat_dataset.extend(convert_to_prompt_completion(ex))

# ✅ Use 10,000 samples for training (not just 500)
flat_dataset = flat_dataset[:10000]

dataset_hf = Dataset.from_list(flat_dataset)

# =====================================================
# STEP 3: Tokenization
# =====================================================
def tokenize_function(example):
    input_text = example["prompt"] + example["completion"]
    tokenized = tokenizer(
        input_text,
        max_length=256,          # more space for dialogue
        truncation=True,
        padding="max_length",
        return_tensors="pt",
    )
    tokenized["labels"] = tokenized["input_ids"].clone()
    return {k: v.squeeze(0) for k, v in tokenized.items()}

tokenized_dataset = dataset_hf.map(tokenize_function, remove_columns=["prompt", "completion"])

data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

# =====================================================
# STEP 4: Apply LoRA Fine-tuning
# =====================================================
lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["c_attn", "c_proj"],  # correct for GPT-2/DialoGPT
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, lora_config)

# =====================================================
# STEP 5: Training
# =====================================================
training_args = TrainingArguments(
    output_dir="./fine_tuned_bot",
    per_device_train_batch_size=2,
    num_train_epochs=3,
    logging_steps=10,
    save_steps=200,
    save_total_limit=2,
    fp16=torch.cuda.is_available(),  # use fp16 if GPU available
    report_to=None
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator
)

trainer.train()

# Save model + tokenizer
model.save_pretrained("./fine_tuned_bot")
tokenizer.save_pretrained("./fine_tuned_bot")

# =====================================================
# STEP 6: Chat with Memory
# =====================================================
MEMORY_FILE = "chat_memory.jsonl"

def save_memory(user, bot):
    with open(MEMORY_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps({"user": user, "bot": bot}) + "\n")

def load_memory():
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return [json.loads(line) for line in f]
    except FileNotFoundError:
        return []

def chat():
    print("Type 'quit' to exit | Type 'reset' to clear memory")

    # Load past memory
    memory = load_memory()
    chat_history = ""
    for m in memory[-10:]:   # only keep last 10 turns
        chat_history += f"User: {m['user']}\nBot: {m['bot']}\n"

    while True:
        user_input = input("You: ")
        if user_input.lower() == "quit":
            break
        if user_input.lower() == "reset":
            open(MEMORY_FILE, "w").close()
            chat_history = ""
            print("🔄 Memory cleared.")
            continue

        # Add user input into conversation history
        chat_history += f"User: {user_input}\nBot:"

        inputs = tokenizer(
            chat_history,
            return_tensors="pt",
            truncation=True,
            max_length=256,
            padding="max_length"
        )

        outputs = model.generate(
            **inputs,
             max_new_tokens=100,
            pad_token_id=tokenizer.eos_token_id,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7
        )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        bot_reply = response.split("Bot:")[-1].strip()

        print(f"Bot: {bot_reply}")

        save_memory(user_input, bot_reply)
        chat_history += f" {bot_reply}\n"

# =====================================================
# Run the chatbot
# =====================================================
chat()
