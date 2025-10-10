import pandas as pd 
import numpy as np 

dataset = pd.read_csv("diabetes.csv")
dataset.head()

X = dataset.drop(columns=["Outcome"])
Y = dataset["Outcome"]
print(X)
print(Y)

from sklearn.model_selection import train_test_split
train_data, test_data, train_label, test_label = train_test_split(X, Y, test_size=0.30, random_state=42)

print(train_data.shape)
print(test_data.shape)

from sklearn.linear_model import LogisticRegression
Model = LogisticRegression()
Model.fit(train_data, train_label)

from sklearn import metrics 

prediction = Model.predict(test_data)
acc = metrics.accuracy_score(test_label, prediction)
print("Accuracy of Model = ", acc)

cnf_Matrix = metrics.confusion_matrix(test_label, prediction)
print(cnf_Matrix)

X = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "Age"]

data = [120, 106, 50, 25, 24, 28]
patient = pd.DataFrame([data], columns = X)
patient.head()

predict_diabetes = Model.predict(patient)
print("Diabetes prediction of patient = ", predict_diabetes)