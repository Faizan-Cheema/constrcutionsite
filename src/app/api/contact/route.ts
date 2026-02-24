import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Neza Construction brand colors
const ACCENT = "#ea580c"; // orange-600
const ACCENT_DARK = "#c2410c"; // orange-700

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL ?? emailUser;

    if (!emailUser || !emailPass) {
      console.error("EMAIL_USER and EMAIL_PASS must be set in .env.local");
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const smtpHost = process.env.SMTP_HOST ?? "smtpout.secureserver.net";
    const smtpPort = parseInt(process.env.SMTP_PORT ?? "465", 10);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
    });

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 30px 20px; text-align: center; background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%);">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">New Contact Form Submission</h1>
                <p style="color: #fef3c7; margin: 10px 0 0 0; font-size: 14px;">Neza Construction website</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 20px; background: linear-gradient(to right, #fff7ed 0%, #ffffff 100%); border-radius: 8px; margin-bottom: 15px; border-left: 5px solid ${ACCENT};">
                      <p style="margin: 0 0 8px 0; color: ${ACCENT}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                      <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 500;">${escapeHtml(name)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; background: linear-gradient(to right, #fff7ed 0%, #ffffff 100%); border-radius: 8px; margin-top: 15px; border-left: 5px solid ${ACCENT};">
                      <p style="margin: 0 0 8px 0; color: ${ACCENT}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email Address</p>
                      <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 500;">
                        <a href="mailto:${escapeHtml(email)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(email)}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; background: linear-gradient(to right, #fff7ed 0%, #ffffff 100%); border-radius: 8px; margin-top: 15px; border-left: 5px solid ${ACCENT};">
                      <p style="margin: 0 0 12px 0; color: ${ACCENT}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                      <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.8; white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">${escapeHtml(message)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 25px 30px; text-align: center; background-color: #fff7ed; border-top: 1px solid #fed7aa;">
                <p style="margin: 0 0 8px 0; color: #666666; font-size: 13px;">This email was sent from the Neza Construction contact form.</p>
                <p style="margin: 0; color: ${ACCENT}; font-size: 14px; font-weight: 600;">Neza Construction Ltd</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Neza Construction</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 40px 20px; text-align: center; background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%);">
                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: 0.5px;">Thank You!</h1>
                <p style="color: #fef3c7; margin: 10px 0 0 0; font-size: 16px;">We've received your message</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 50px 40px;">
                <p style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; line-height: 1.6; font-weight: 500;">Hello ${escapeHtml(name)},</p>
                <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px; line-height: 1.8;">
                  We have received your message and will get back to you soon.
                </p>
                <div style="background: linear-gradient(to right, #fff7ed 0%, #ffffff 100%); padding: 20px; border-radius: 8px; border-left: 5px solid ${ACCENT}; margin: 25px 0;">
                  <p style="margin: 0; color: #666666; font-size: 15px; line-height: 1.7;">
                    Our team typically responds within <strong style="color: ${ACCENT};">24-48 hours</strong>. We appreciate your patience and look forward to assisting with your project.
                  </p>
                </div>
                <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                  For urgent inquiries, contact us at <a href="mailto:Admin@NezaConstruction.Ltd" style="color: ${ACCENT}; text-decoration: none; font-weight: 500;">Admin@NezaConstruction.Ltd</a> or call <strong style="color: ${ACCENT};">07584 045630</strong>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 40px; text-align: center; background-color: #fff7ed; border-top: 1px solid #fed7aa;">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 13px;">This is an automated confirmation from Neza Construction Ltd.</p>
                <p style="margin: 0; color: ${ACCENT}; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">Neza Construction Ltd</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: emailUser,
      to: receiverEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailHTML,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Thank You for Contacting Neza Construction",
      html: userEmailHTML,
      text: `Hello ${name},\n\nWe have received your message and will get back to you soon.\n\nOur team typically responds within 24-48 hours. For urgent inquiries: Admin@NezaConstruction.Ltd or 07584 045630.\n\nNeza Construction Ltd`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
