import express from "express";
import {
  getHotelsCountByType,
  createHotel,
  deleteSingleHotel,
  getAllHotels,
  getHotelRooms,
  getHotelsCountByCity,
  getSingleHotel,
  updateSingleHotel,
  deleteAllHotels,
} from "../controllers/hotelController.js";
import { verifyBackofficeStaff } from "../utils/verifyToken.js";

const router = express.Router();

// Get all hotels
router.get("/", getAllHotels);
router.get("/countbycity", getHotelsCountByCity);
router.get("/countbytype", getHotelsCountByType);
router.get("/room/:id", getHotelRooms);

// Get a single hotel
router.get("/:id", getSingleHotel);

// Create a new hotel
router.post("/", verifyBackofficeStaff, createHotel);

// Update a single hotel
router.put("/:id", verifyBackofficeStaff, updateSingleHotel);

// Delete a single hotel
router.delete("/:id", verifyBackofficeStaff, deleteSingleHotel);

// Delete all hotels
router.delete("/", deleteAllHotels);

export default router;
