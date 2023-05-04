import express from "express";
import {
  getFlightsCountByType,
  createFlight,
  deleteSingleFlight,
  getAllFlights,
  getFlightSeats,
  getFlightsCountByCity,
  getSingleFlight,
  updateSingleFlight,
} from "../controllers/flightController.js";
import { verifyBackofficeStaff } from "../utils/verifyToken.js";

const router = express.Router();

// Get all Flights
router.get("/", getAllFlights);
router.get("/countbycity", getFlightsCountByCity);
router.get("/countbytype", getFlightsCountByType);
router.get("/seat/:id", getFlightSeats);

// Get a single Flight
router.get("/:id", getSingleFlight);

// Create a new Flight
router.post("/", verifyBackofficeStaff, createFlight);

// Update a single Flight
router.put("/:id", verifyBackofficeStaff, updateSingleFlight);

// Delete a single Flight
router.delete("/:id", verifyBackofficeStaff, deleteSingleFlight);

// Delete all Flights
// router.delete("/", deleteAllFlights);

export default router;
