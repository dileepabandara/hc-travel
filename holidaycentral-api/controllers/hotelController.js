import HotelModel from "../models/HotelModel.js";
import mongoose from "mongoose";
import RoomModel from "../models/RoomModel.js";
const { ObjectId } = mongoose.Types;

// Get All Hotels Controller
// export const getAllHotels = async (req, res, next) => {
//   try {
//     const hotels = await HotelModel.find();
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

// Get All Hotels Controller
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 9999 },
    });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// Get Single Hotel Controller
export const getSingleHotel = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid hotel ID");
  }
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// Get Hotel Count By City Controller
export const getHotelsCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Get Hotel Count By Type Controller
export const getHotelsCountByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: "Hotel" });
    const apartmentCount = await HotelModel.countDocuments({
      type: "Apartment",
    });
    const resortCount = await HotelModel.countDocuments({ type: "Resort" });
    const villaCount = await HotelModel.countDocuments({ type: "Villa" });
    const cabinCount = await HotelModel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "Hotels", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villaCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// Get Hotel Rooms
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// Create Hotel Controller
export const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// Update Single Hotel Controller
export const updateSingleHotel = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid hotel ID");
  }
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// Delete Single Hotel Controller
export const deleteSingleHotel = async (req, res, next) => {
  // Check if user id is a invalid ObjectId
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid hotel ID");
  }
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel ${req.params.id} has been deleted...`);
  } catch (err) {
    next(err);
  }
};

// Delete All Hotels Controller
export const deleteAllHotels = async (req, res, next) => {
  try {
    await HotelModel.deleteMany();
    res.status(200).json("All hotels have been deleted...");
  } catch (err) {
    next(err);
  }
};
