import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Strip CR/LF so user input can never inject extra mail headers
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (key: string) => {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        hits.set(key, recent);
        return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 500) {
        for (const [k, v] of hits) {
            if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
        }
    }
    return false;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const data = await request.formData();

        // Honeypot: real users never fill this hidden field. Pretend success to bots.
        if (String(data.get('company_website') || '').trim() !== '') {
            return json({ message: 'Email sent successfully' });
        }

        const name = singleLine(String(data.get('from_name') || ''));
        const email = singleLine(String(data.get('from_email') || ''));
        const rawSubject = singleLine(String(data.get('subject') || ''));
        const message = String(data.get('message') || '').trim();
        const company = singleLine(String(data.get('company_name') || ''));
        const service = singleLine(String(data.get('service') || ''));
        const budget = singleLine(String(data.get('budget') || ''));
        const timeline = singleLine(String(data.get('timeline') || ''));
        const source = singleLine(String(data.get('source') || 'portfolio'));

        const isAgency = source === 'novastack' || Boolean(service || budget || company || timeline);
        const subject = rawSubject || (isAgency ? `NovaStack Project Inquiry: ${service || 'General'}` : 'New Portfolio Contact');

        if (!name || !email || !message) {
            return json({ message: 'Missing required fields: name, email, and message are mandatory.' }, 400);
        }
        if (!EMAIL_RE.test(email)) {
            return json({ message: 'Please enter a valid business email address.' }, 400);
        }
        if (name.length > 120 || email.length > 200 || subject.length > 180 || message.length > 6000) {
            return json({ message: 'One or more fields exceed maximum character limits.' }, 400);
        }

        let ip = 'unknown';
        try {
            ip =
                request.headers.get('x-nf-client-connection-ip') ||
                request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                clientAddress ||
                'unknown';
        } catch {
            /* clientAddress can throw outside a real request context */
        }
        if (isRateLimited(ip)) {
            return json({ message: 'Too many messages. Please try again in a few minutes.' }, 429);
        }

        const smtpUser = import.meta.env.SMTP_USER || process.env.SMTP_USER;
        const smtpPass = import.meta.env.SMTP_PASS || process.env.SMTP_PASS;
        const smtpHost = import.meta.env.SMTP_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = import.meta.env.SMTP_PORT || process.env.SMTP_PORT || '465';
        const contactEmail = import.meta.env.CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'tanujp09@gmail.com';

        if (!smtpUser || !smtpPass) {
            console.error('Missing SMTP credentials on server environment');
            return json({ 
                message: 'Inquiry received. Mail service is temporarily offline, please email tanujp09@gmail.com directly.' 
            }, 500);
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

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeCompany = company ? escapeHtml(company) : 'Not specified';
        const safeService = service ? escapeHtml(service) : 'General Inquiry';
        const safeBudget = budget ? escapeHtml(budget) : 'Not specified';
        const safeTimeline = timeline ? escapeHtml(timeline) : 'Not specified';
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message);

        const emailSubject = isAgency
            ? `[NovaStack Studio] ${safeService} — ${safeCompany !== 'Not specified' ? safeCompany : safeName}`
            : `[Portfolio Contact] ${safeSubject}`;

        const textContent = isAgency
            ? `NovaStack Project Inquiry:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${service || 'General'}\nBudget: ${budget || 'N/A'}\nTimeline: ${timeline || 'N/A'}\n\nProject Scope:\n${message}`
            : `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

        const htmlContent = isAgency
            ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; max-width: 620px; background-color: #FFFFFF; color: #0F172A;">
          <div style="border-bottom: 2px solid #2563EB; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #0F172A; margin: 0; font-size: 20px; font-weight: 700;">NovaStack Project Inquiry</h2>
            <p style="color: #64748B; margin: 4px 0 0 0; font-size: 13px;">Founder-Led Digital Development Studio · Client Inquiry</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: 500;">Client Name:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Work Email:</td>
              <td style="padding: 8px 0; color: #2563EB; font-weight: 600;"><a href="mailto:${safeEmail}" style="color: #2563EB; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Company:</td>
              <td style="padding: 8px 0; color: #0F172A;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Service Required:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${safeService}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Project Budget:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: 600;">${safeBudget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Preferred Timeline:</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${safeTimeline}</td>
            </tr>
          </table>

          <div style="padding: 16px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-top: 10px;">
            <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Project Description & Requirements:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #1E293B; line-height: 1.6; font-size: 14px;">${safeMessage}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #94A3B8;">
            Sent from NovaStack Studio website · Replying to this email will directly email ${safeEmail}
          </div>
        </div>
      `
            : `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #2563EB; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Enquiry</h2>
          <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; border-left: 4px solid #2563EB;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${safeMessage}</p>
          </div>
        </div>
      `;

        await transporter.sendMail({
            from: smtpUser,
            to: contactEmail,
            replyTo: email,
            subject: emailSubject,
            text: textContent,
            html: htmlContent,
        });

        return json({ message: 'Thank you for contacting NovaStack Studio. Your project inquiry has been received, and Tanuj will get back to you within 24 hours.' });
    } catch (error: any) {
        console.error('SMTP Error:', error);
        return json({ message: 'Failed to send inquiry. Please email tanujp09@gmail.com directly.' }, 500);
    }
};
