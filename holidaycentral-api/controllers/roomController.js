import RoomModel from "../models/RoomModel.js";
import HotelModel from "../models/HotelModel.js";

// Get All Rooms Controller
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// Get Single Room Controller
export const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Create Room Controller
export const createRoom = async (req, res, next) => {
  const hotelID = req.params.hotelID;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// Update Room Controller
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// Update Room Availability Controller
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// Delete Room Controller
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelID;
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(`Room ${req.params.id} has been deleted.`);
  } catch (err) {
    next(err);
  }
};

// Delete All Rooms Controller
export const deleteAllRooms = async (req, res, next) => {
  try {
    await RoomModel.deleteMany();
    res.status(200).json("All rooms have been deleted.");
  } catch (err) {
    next(err);
  }
};
