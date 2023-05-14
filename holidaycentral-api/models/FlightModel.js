import mongoose from "mongoose";
const { Schema } = mongoose;

const flightSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    departureDestination: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    arrivalDestination: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: String,
      required: true,
    },
    cabinClass: {
      type: String,
      required: true,
    },
    seats: {
      type: [String],
    },
    photos: {
      type: [String],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const flightModel = mongoose.model("Flight", flightSchema);

export default flightModel;
