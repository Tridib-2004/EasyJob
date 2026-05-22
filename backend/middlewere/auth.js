import {wrapAsync} from "../middlewere/wrapAsync.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userSchema.js";


export const isAuthenticated = wrapAsync(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler(401, "Please login to access this resource"));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler(401, "Invalid token. Please login again."));
    }
});

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(403,"You are not authorized to access this resource"));
        }
        next();
    }
}