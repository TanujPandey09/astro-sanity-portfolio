import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("from_name");
    const email = data.get("from_email");
    const subject = data.get("subject");
    const message = data.get("message");
    if (!name || !email || !message || !subject) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const smtpUser = "tanujp09@gmail.com";
    const smtpPass = "deka assy mvuf lqfl";
    const smtpHost = "smtp.gmail.com";
    const smtpPort = "465";
    const contactEmail = "tanujp09@gmail.com";
    if (!smtpUser || !smtpPass) ;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/\s+/g, "")
      }
    });
    const mailOptions = {
      from: smtpUser,
      to: contactEmail,
      replyTo: String(email),
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
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
      `
    };
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SMTP Error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        error: error.message || "Unknown SMTP Error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
