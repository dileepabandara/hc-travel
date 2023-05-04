import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
  verifyBackofficeStaff,
  verifyTravelAgent,
} from "../utils/verifyToken.js";

const router = express.Router();

// Check Authentication
router.get("/auth", verifyToken, (req, res) => {
  res.send(`${req.user.role}: (${req.user.id}) user is authenticated!`);
});

// Test Mode
const testMode = true;
if (testMode) {
  // Check User Login
  router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.send(`Hello ${req.user.role}: (${req.user.id}), you are logged in!`);
  });

  // Check TravelAgent Authorization
  router.get("/travelagent", verifyTravelAgent, (req, res) => {
    res.send(
      "TravelAgent Role is authenticated! You can perform travel agent actions..."
    );
  });

  // Check BackofficeStaff Authorization
  router.get("/backofficestaff", verifyBackofficeStaff, (req, res) => {
    res.send(
      "Backoffice Staff Role is authenticated! You can perform backoffice staff actions..."
    );
  });

  // Check Admin Authorization
  router.get("/admin", verifyAdmin, (req, res) => {
    res.send("Admin Role is authenticated! You can perform admin actions...");
  });
}

// Get a single user
router.get("/:id", verifyUser, getSingleUser);

// Get all users
router.get("/", verifyAdmin, getAllUsers);

// Update a single user
router.put("/", verifyAdmin, updateUser);

// Delete a single user
router.delete("/:id", verifyAdmin, deleteUser);

// Delete all users
// router.delete("/", verifyAdmin, deleteAllUsers);

export default router;
