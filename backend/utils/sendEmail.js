import nodeMailer from "nodemailer";
import {config} from "dotenv";

export const sendEmail=async({email,subject,message})=>{
    try{
        const transporter=nodeMailer.createTransport({
            host:process.env.SMPT_HOST,
            port:process.env.SMPT_PORT,
            service:process.env.SMPT_SERVICE,
            auth:{
                user:process.env.SMPT_MAIL,
                pass:process.env.SMPT_PASSWORD
            }
        });

        const mailOptions={
            from:process.env.SMPT_MAIL,
            to:email,
            subject:subject,
            text:message
        };
        await transporter.sendMail(mailOptions);
    }   catch(error){
        console.log("Error while sending email",error);
    }       


}