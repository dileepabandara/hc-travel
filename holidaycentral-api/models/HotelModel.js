import mongoose from "mongoose";
const { Schema } = mongoose;

const hotelSchema = new Schema(
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
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    geolocation: {
      type: [Number],
    },
    photos: {
      type: [String],
      required: true,
    },
    facilities: {
      type: [String],
      required: true,
    },
    stars: {
      type: Number,
      min: 0,
      max: 5,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    rooms: {
      type: [String],
    },
    board: {
      type: [String],
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

const HotelModel = mongoose.model("Hotel", hotelSchema);

export default HotelModel;
