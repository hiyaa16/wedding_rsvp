// GET request (test)
fetch("http://localhost:5000/api/rsvp")
  .then(res => res.json())
  .then(data => console.log("GET success:", data))
  .catch(err => console.error("GET error:", err));

// POST request (RSVP form ke liye)
fetch("http://localhost:5000/api/rsvp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Hiya Jain",
    phone: "9999999999",
    attending: "Yes"
  })
})
  .then(res => res.json())
  .then(data => console.log("POST success:", data))
  .catch(err => console.error("POST error:", err));
