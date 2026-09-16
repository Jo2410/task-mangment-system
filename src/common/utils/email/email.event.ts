import { EventEmitter } from "node:events"
import Mail from "nodemailer/lib/mailer";
import { sendEmail } from "./send.email";
import { verifyEmail } from "./verify.template.email";
import { OtpEnum } from "../../enum/otp.enum";
export const emailEvent = new EventEmitter();

interface IEmail extends Mail.Options {
    otp: string
}

emailEvent.on(OtpEnum.ConfirmEmail, async(data:IEmail)=>{

    try {
        data.subject = OtpEnum.ConfirmEmail,
        data.html = verifyEmail(data.otp,data.subject)
        await sendEmail(data)
    } catch (error) {
        console.log(`Fail To Send Email`, error);
        
    }
})




emailEvent.on(OtpEnum.ResetPassword, async(data:IEmail)=>{

    try {
        data.subject = OtpEnum.ResetPassword,
        data.html = verifyEmail(data.otp,data.subject)
        await sendEmail(data)
    } catch (error) {
        console.log(`Fail To Send Email`, error);
        
    }
})