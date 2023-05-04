import mongoose from "mongoose";
const { Schema } = mongoose;

const packageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    travelers: {
      type: Number,
    },
    specialty: {
      type: String,
      required: true,
    },
    facilities: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PackageModel = mongoose.model("Package", packageSchema);

export default PackageModel;
