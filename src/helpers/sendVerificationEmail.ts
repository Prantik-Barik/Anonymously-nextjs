import { resend } from "@/lib/resend";
import VerificationEmail from "../../templates/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
): Promise<ApiResponse>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anontmously | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
        });

        return {
            success : true,
            message : "Successfully sent verification email"
        }
    } catch (error) {
        console.log("Error sending verification email", error)
        return {
            success : false,
            message : "Failed to send verification email"
        }
    }
}