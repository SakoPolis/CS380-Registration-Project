// backend/utilities/sendConfirmationEmail.js
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(to, classDetails) {
    const classList = (classDetails || [])
        .map(
            (cls) => `<li>${cls.name} - $${cls.price} - Starts: ${cls.startDate}</li>`
        )
        .join("");

    const html = `
    <h2>Thank you for your purchase!</h2>
    <p>You’ve successfully enrolled in the following classes:</p>
    <ul>${classList}</ul>
  `;

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL || "no-reply@yourdomain.com",
            to,
            subject: "Class Purchase Confirmation",
            html,
        });
        if (error) {
            console.error("Resend API error:", error);
        } else {
            console.log("Confirmation email sent:", data?.id);
        }
    } catch (err) {
        console.error("Failed to send confirmation email:", err);
    }
}
