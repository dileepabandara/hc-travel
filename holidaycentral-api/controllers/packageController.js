import PackageModel from "../models/PackageModel.js";
import mongoose from "mongoose";
import SeatModel from "../models/SeatModel.js";
const { ObjectId } = mongoose.Types;

// Get All Package Controller
// export const getAllPackage = async (req, res, next) => {
//   try {
//     const packageH = await PackageModel.find();
//     res.status(200).json(packageH);
//   } catch (err) {
//     next(err);
//   }
// };

// Get All Package Controller
export const getAllPackages = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const packageH = await PackageModel.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 9999 },
    });
    res.status(200).json(packageH);
  } catch (err) {
    next(err);
  }
};

// Get Single Package Controller
export const getSinglePackage = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid packageH ID");
  }
  try {
    const packageH = await PackageModel.findById(req.params.id);
    res.status(200).json(packageH);
  } catch (err) {
    next(err);
  }
};

// Get Package Count By City Controller
export const getPackagesCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return PackageModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get Package Count By Type Controller
export const getPackagesCountByType = async (req, res, next) => {
  try {
    const honeymoon = await PackageModel.countDocuments({
      type: "Honeymoon",
    });
    const beachHoliday = await PackageModel.countDocuments({
      type: "BeachHoliday",
    });
    const wildlifeExcursion = await PackageModel.countDocuments({
      type: "WildlifeExcursion",
    });
    const familyHoliday = await PackageModel.countDocuments({
      type: "FamilyHoliday",
    });

    res.status(200).json([
      { type: "Honeymoon", count: honeymoon },
      { type: "BeachHoliday", count: beachHoliday },
      { type: "WildlifeExcursion", count: wildlifeExcursion },
      { type: "FamilyHoliday", count: familyHoliday },
    ]);
  } catch (err) {
    next(err);
  }
};

// Get Package Seats
export const getPackageSeats = async (req, res, next) => {
  try {
    const packageH = await PackageModel.findById(req.params.id);
    const list = await Promise.all(
      packageH.seats.map((seat) => {
        return SeatModel.findById(seat);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Create Package Controller
export const createPackage = async (req, res, next) => {
  const newPackage = new PackageModel(req.body);
  try {
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    next(err);
  }
};

// Update Single Package Controller
export const updateSinglePackage = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid packageH ID");
  }
  try {
    const updatedPackage = await PackageModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedPackage);
  } catch (err) {
    next(err);
  }
};

// Delete Single Package Controller
export const deleteSinglePackage = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid packageH ID");
  }
  try {
    await PackageModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Package ${req.params.id} has been deleted...`);
  } catch (err) {
    next(err);
  }
};

// Delete All Package Controller
// export const deleteAllPackage = async (req, res, next) => {
//   try {
//     await PackageModel.deleteMany();
//     res.status(200).json("All Package have been deleted...");
//   } catch (err) {
//     next(err);
//   }
// };
