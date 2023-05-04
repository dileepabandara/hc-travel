import express from "express";
import {
  getPackagesCountByType,
  createPackage,
  deleteSinglePackage,
  getAllPackages,
  getPackagesCountByCity,
  getSinglePackage,
  updateSinglePackage,
} from "../controllers/packageController.js";
import { verifyBackofficeStaff } from "../utils/verifyToken.js";

const router = express.Router();

// Get all Packages
router.get("/", getAllPackages);
router.get("/countbycity", getPackagesCountByCity);
router.get("/countbytype", getPackagesCountByType);

// Get a single Package
router.get("/:id", getSinglePackage);

// Create a new Package
router.post("/", verifyBackofficeStaff, createPackage);

// Update a single Package
router.put("/:id", verifyBackofficeStaff, updateSinglePackage);

// Delete a single Package
router.delete("/:id", verifyBackofficeStaff, deleteSinglePackage);

// Delete all Packages
// router.delete("/", deleteAllPackages);

export default router;
