import SeatModel from "../models/SeatModel.js";
import FlightModel from "../models/FlightModel.js";

// Get All Seats Controller
export const getSeats = async (req, res, next) => {
  try {
    const seats = await SeatModel.find();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

// Get Single Seat Controller
export const getSeat = async (req, res, next) => {
  try {
    const seat = await SeatModel.findById(req.params.id);
    res.status(200).json(seat);
  } catch (err) {
    next(err);
  }
};

// Create Seat Controller
export const createSeat = async (req, res, next) => {
  const flightID = req.params.flightID;
  const newSeat = new SeatModel(req.body);

  try {
    const savedSeat = await newSeat.save();
    try {
      await FlightModel.findByIdAndUpdate(flightID, {
        $push: { seats: savedSeat._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSeat);
  } catch (err) {
    next(err);
  }
};

// Update Seat Controller
export const updateSeat = async (req, res, next) => {
  try {
    const updatedSeat = await SeatModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSeat);
  } catch (err) {
    next(err);
  }
};

// Update Seat Availability Controller
export const updateSeatAvailability = async (req, res, next) => {
  try {
    await SeatModel.updateOne(
      { "seatNumbers._id": req.params.id },
      {
        $push: {
          "seatNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Seat status has been updated.");
  } catch (err) {
    next(err);
  }
};

// Delete Seat Controller
export const deleteSeat = async (req, res, next) => {
  const flightId = req.params.flightID;
  try {
    await SeatModel.findByIdAndDelete(req.params.id);
    try {
      await FlightModel.findByIdAndUpdate(flightId, {
        $pull: { seats: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(`Seat ${req.params.id} has been deleted.`);
  } catch (err) {
    next(err);
  }
};
