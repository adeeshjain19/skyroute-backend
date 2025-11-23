const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper: make airport code from city name (first 3 letters)
function makeCode(name, fallback) {
  if (!name) return fallback;
  return name.trim().slice(0, 3).toUpperCase().padEnd(3, "X");
}

// GET /api/flights?origin=delhi&destination=mumbai&date=2025-10-15
app.get("/api/flights", (req, res) => {
  const { origin = "", destination = "", date = "" } = req.query;

  const originName = origin || "Origin City";
  const destinationName = destination || "Destination City";

  const originCode = makeCode(originName, "ORG");
  const destinationCode = makeCode(destinationName, "DST");

  // We generate 3 fake flights for ANY origin/destination you type
  const flights = [
    {
      id: "SR101",
      airline: "SkyRoute",
      price: 3499,                 // INR
      departureTime: "08:30",
      arrivalTime: "10:15",
      duration: "1h 45m",
      stopsDescription: "Direct",
      originCode,
      destinationCode,
      travelDate: date || null,
    },
    {
      id: "AC202",
      airline: "AirConnect",
      price: 2899,
      departureTime: "12:00",
      arrivalTime: "13:50",
      duration: "1h 50m",
      stopsDescription: "Direct",
      originCode,
      destinationCode,
      travelDate: date || null,
    },
    {
      id: "GA303",
      airline: "GlobalAir",
      price: 4199,
      departureTime: "18:30",
      arrivalTime: "20:20",
      duration: "1h 50m",
      stopsDescription: "1 Stop",
      originCode,
      destinationCode,
      travelDate: date || null,
    },
  ];

  res.json(flights);
});

app.listen(PORT, () => {
  console.log(`SkyRoute backend running on http://localhost:${PORT}`);
});
