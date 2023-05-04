import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

// Register Controller
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await UserModel({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send(`User ${req.body.username} created successfully!`);
  } catch (err) {
    next(err);
  }
};

// Login Controller
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "User not found!"));
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) return next(createError(400, "Invalid credentials!"));
    const accessToken = Jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    const { password, role, ...otherDetails } = user._doc;
    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, role });
  } catch (err) {
    next(err);
  }
};

// Logout Controller
export const logout = async (req, res, next) => {
  try {
    if (req.cookies.accessToken) {
      verifyToken(req, res, () => {
        const userID = req.user.id;
        const userRole = req.user.role;
        res
          .clearCookie("accessToken")
          .status(200)
          .send(`${userRole}: (${userID}) logged out successfully!`);
      });
    } else {
      res.status(401).send("User already logged out!");
    }
  } catch (err) {
    next(err);
  }
};
