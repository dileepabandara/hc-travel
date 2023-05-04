import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    img: {
      type: String,
      default: "https://i.ibb.co/30NrpXX/avatar.jpg",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

//TODO: Add First Name and Last Name
