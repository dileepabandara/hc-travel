import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

// Verify Token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "User not authenticated!"));
  }

  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(createError(403, "Invalid token!"));
    req.user = decoded;
    console.log(`UserRole: ${req.user.role}`);
    next();
  });
};

//TODO: Verify User, TravelAgent, BackofficeStaff, Admin for availability
// Verify User
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.id === req.params.id || req.user.role === "Admin")
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Verify TravelAgent
export const verifyTravelAgent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role === "TravelAgent" || req.user.role === "Admin")
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Verify BackofficeStaff
export const verifyBackofficeStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role === "BackofficeStaff" || req.user.role === "Admin")
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Verify Admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === "Admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
