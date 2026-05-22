import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookiesParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import { handleError } from "./middlewere/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js";
import jobRouter from "./router/jobRouter.js";
import applicationRouter from "./router/applicationRouter.js";

const app = express();
config({path:"./config/config.env"});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter);
app.use("/job",jobRouter);
app.use("/application",applicationRouter);
connectDB();
app.use(handleError);
export default app;