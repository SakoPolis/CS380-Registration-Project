import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(to, classDetails) {
    const classList = classDetails.map(cls =>
        `<li>${cls.name} - $${cls.price} - Starts: ${cls.startDate}</li>`
    ).join('');

    const html = `
    <h2>Thank you for your purchase!</h2>
    <p>You’ve successfully enrolled in the following classes:</p>
    <ul>${classList}</ul>
  `;

    try {
        await resend.emails.send({
            from: 'no-reply@yourdomain.com',
            to,
            subject: 'Class Purchase Confirmation',
            html,
        });
    } catch (error) {
        console.error('Failed to send confirmation email:', error);
    }
}
