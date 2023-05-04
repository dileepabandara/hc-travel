import express from "express";
import {
  createSeat,
  deleteSeat,
  getSeat,
  getSeats,
  updateSeat,
  updateSeatAvailability,
} from "../controllers/seatController.js";
import {
  verifyBackofficeStaff,
  verifyTravelAgent,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

// Create a new seat
router.post("/:flightID", verifyBackofficeStaff, createSeat);

// Update the seat availability
router.put("/availability/:id", verifyTravelAgent, updateSeatAvailability);

// Update a single seat
router.put("/:id", verifyBackofficeStaff, updateSeat);

// Delete a single seat
router.delete("/:id", verifyBackofficeStaff, deleteSeat);

// Get a single seat
router.get("/:id", getSeat);

// Get all seats
router.get("/", getSeats);

export default router;
