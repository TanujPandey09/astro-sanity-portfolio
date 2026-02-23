import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');

        // Validation
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(import.meta.env.SMTP_PORT || '465'),
            secure: true,
            auth: {
                user: import.meta.env.SMTP_USER,
                pass: import.meta.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: import.meta.env.SMTP_USER,
            to: import.meta.env.CONTACT_EMAIL || 'tanup09@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #7000FF;">New Contact Request</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: 'Email sent successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('SMTP Error:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to send email' }),
            { status: 500 }
        );
    }
};
