import UserModel from "../models/UserModel.js";
import { createError } from "../utils/error.js";

// Get All Users Controller
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get Single User Controller
export const getSingleUser = async (req, res, next) => {
  try {
    const users = await UserModel.findById(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Update Single User Controller
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (err) {
    // check if user id not found
    if (err.path === "_id")
      next(createError(404, `User ${req.body._id} not found!`));
    // check if data duplicate
    else if (
      err.code === 11000 &&
      err.message.includes(`email: "${req.body.email}"`)
    )
      next(createError(400, `Email ${req.body.email} already exists!`));
    else next(err);
  }
};

// Delete Single User Controller
export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`User ${req.params.id} has been deleted...`);
  } catch (err) {
    // check if user id not found
    if (err.path === "_id")
      next(createError(404, `User ${req.params.id} not found!`));
    else next(err);
  }
};

// Delete All Users Controller
// export const deleteAllUsers = async (req, res, next) => {
//   try {
//     await UserModel.deleteMany();
//     res.status(200).json("All Users have been deleted...");
//   } catch (err) {
//     next(err);
//   }
// };
