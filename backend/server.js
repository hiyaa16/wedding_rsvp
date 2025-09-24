import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ✅ CORS allow for React frontend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ✅ Simple GET route to test backend
app.get("/api/rsvp", (req, res) => {
  res.json({ message: "Backend GET request works!" });
});

// ✅ Existing POST route for sending RSVP to Google Script
app.post("/api/rsvp", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz7IHRrVtqSV6ez8y5YPdcDiKerxGNVhDA79OZI_y5tp6pYSDy5M14ZuafiO7GzIU8a/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
