import dotenv from "dotenv";
export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    
const cookieExpire = Number(process.env.COOKIE_EXPIRE) || 7;
    const options = {
        expires: new Date(
            Date.now() + cookieExpire * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
       sameSite: "None",
       secure: true      // ✅ MUST be false in localhost (http)
    };
  

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            message,
            token
        });

};