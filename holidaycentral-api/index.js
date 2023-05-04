// Express
import express from "express";
// Dotenv
import dotenv from "dotenv";
// Mongoose
import mongoose from "mongoose";
// Routes
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import flightsRoute from "./routes/flightsRoute.js";
import seatsRoute from "./routes/seatsRoute.js";
import packagesRoute from "./routes/packagesRoute.js";
// Cookie parser
import cookieParser from "cookie-parser";
// Cors
import cors from "cors";

// Express app
const app = express();
dotenv.config();

// Port
const PORT = process.env.PORT || 3000;

// Mongoose connected
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Mongoose connection open
mongoose.connection.once("open", () => {
  console.log("MongoDB connection open!");
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB server!");
  } catch (error) {
    throw error;
  }
};

// Mongoose connection error handling
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err.message}`);
});

// Mongoose disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/flights", flightsRoute);
app.use("/api/seats", seatsRoute);
app.use("/api/packages", packagesRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}!`);
  connectDB();
});
