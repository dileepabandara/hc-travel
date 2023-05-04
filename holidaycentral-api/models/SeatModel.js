import mongoose from "mongoose";
const { Schema } = mongoose;

const seatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    seatNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

const SeatModel = mongoose.model("Seat", seatSchema);

export default SeatModel;
