import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const name = data.get('from_name');
        const email = data.get('from_email');
        const subject = data.get('subject');
        const message = data.get('message');

        // Validation
        if (!name || !email || !message || !subject) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const smtpUser = import.meta.env.SMTP_USER || process.env.SMTP_USER;
        const smtpPass = import.meta.env.SMTP_PASS || process.env.SMTP_PASS;
        const smtpHost = import.meta.env.SMTP_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = import.meta.env.SMTP_PORT || process.env.SMTP_PORT || '465';
        const contactEmail = import.meta.env.CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'tanujp09@gmail.com';

        // Extra check to ensure user provided variables in dashboard
        if (!smtpUser || !smtpPass) {
             console.error("Missing SMTP Credentials on Server Environment");
             return new Response(
                 JSON.stringify({ 
                     message: 'Server setup error', 
                     error: 'SMTP credentials are missing from Netlify environment variables dashboard.' 
                 }),
                 { status: 500, headers: { 'Content-Type': 'application/json' } }
             );
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort),
            secure: true,
            auth: {
                user: smtpUser,
                pass: smtpPass.replace(/\s+/g, ''),
            },
        });

        const mailOptions = {
            from: smtpUser,
            to: contactEmail,
            replyTo: String(email),
            subject: `[Portfolio Contact] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #599692; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Transmission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; border-left: 4px solid #599692;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: 'Email sent successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        console.error('SMTP Error:', error);
        return new Response(
            JSON.stringify({ 
                message: 'Failed to send email',
                error: error.message || 'Unknown SMTP Error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

