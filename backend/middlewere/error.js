class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}



export const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        const error = new ErrorHandler(400, message);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        const error = new ErrorHandler(400, message);
    }
     if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        const error = new ErrorHandler(400, message);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, try again`;
        const error = new ErrorHandler(400, message);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default ErrorHandler;