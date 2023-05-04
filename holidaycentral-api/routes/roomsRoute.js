import express from "express";
import {
  createRoom,
  deleteAllRooms,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import {
  verifyBackofficeStaff,
  verifyTravelAgent,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

// Create a new room
router.post("/:hotelID", verifyBackofficeStaff, createRoom);

// Update the room availability
router.put("/availability/:id", verifyTravelAgent, updateRoomAvailability);

// Update a single room
router.put("/:id", verifyBackofficeStaff, updateRoom);

// Delete a single room
router.delete("/:id/:hotelID", verifyBackofficeStaff, deleteRoom);

// Get a single room
router.get("/:id", getRoom);

// Get all rooms
router.get("/", getRooms);

// Delete all hotels
router.delete("/", deleteAllRooms);

export default router;
