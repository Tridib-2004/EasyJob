import cron from "node-cron";
import { Job } from "../models/jobSchema";
import { User } from "../models/userSchema";
import { sendEmail } from "../utils/sendEmail.js";
