import FlightModel from "../models/FlightModel.js";
import mongoose from "mongoose";
import SeatModel from "../models/SeatModel.js";
const { ObjectId } = mongoose.Types;

// Get All Flight Controller
// export const getAllFlight = async (req, res, next) => {
//   try {
//     const flight = await FlightModel.find();
//     res.status(200).json(flight);
//   } catch (err) {
//     next(err);
//   }
// };

// Get All Flight Controller
export const getAllFlights = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const flight = await FlightModel.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 9999 },
    });
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

// Get Single Flight Controller
export const getSingleFlight = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid flight ID");
  }
  try {
    const flight = await FlightModel.findById(req.params.id);
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

// Get Flight Count By City Controller
export const getFlightsCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return FlightModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get Flight Count By Type Controller
export const getFlightsCountByType = async (req, res, next) => {
  try {
    const businessCount = await FlightModel.countDocuments({
      type: "Business",
    });
    const familyCount = await FlightModel.countDocuments({
      type: "Family",
    });
    const cabinCount = await FlightModel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "Business", count: businessCount },
      { type: "Family", count: familyCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// Get Flight Seats
export const getFlightSeats = async (req, res, next) => {
  try {
    const flight = await FlightModel.findById(req.params.id);
    const list = await Promise.all(
      flight.seats.map((seat) => {
        return SeatModel.findById(seat);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Create Flight Controller
export const createFlight = async (req, res, next) => {
  const newFlight = new FlightModel(req.body);
  try {
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    next(err);
  }
};

// Update Single Flight Controller
export const updateSingleFlight = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid flight ID");
  }
  try {
    const updatedFlight = await FlightModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedFlight);
  } catch (err) {
    next(err);
  }
};

// Delete Single Flight Controller
export const deleteSingleFlight = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid flight ID");
  }
  try {
    await FlightModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Flight ${req.params.id} has been deleted...`);
  } catch (err) {
    next(err);
  }
};

// Delete All Flight Controller
// export const deleteAllFlight = async (req, res, next) => {
//   try {
//     await FlightModel.deleteMany();
//     res.status(200).json("All Flight have been deleted...");
//   } catch (err) {
//     next(err);
//   }
// };
