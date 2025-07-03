import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

export const twilioConfig = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM,
    phone: process.env.PHONE
};

export const createTwilioClient = () => {
    return twilio(twilioConfig.accountSid, twilioConfig.authToken);
};