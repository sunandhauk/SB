import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      selectedService,
      idea,
      budget,
      timeline,
      ticketId: customTicketId,
    } = data;

    const ticketId =
      customTicketId ||
      `SB-${Math.floor(1000 + Math.random() * 9000)}`;
    const clientName = (name && name.trim()) || "Valued Client";
    const clientEmail = (email && email.trim()) || "";
    const clientPhone = (phone && phone.trim()) || "";
    const serviceName = selectedService || "Website / Custom App / AI";
    const clientIdea =
      (idea && idea.trim()) ||
      `Client requested a studio dispatch consultation for ${serviceName}.`;

    const recipientEmail = "stackbros.work@gmail.com";
    const smtpUser = process.env.SMTP_USER || "stackbros.work@gmail.com";
    // Strip any accidental spaces from the Google App Password
    const rawPass = process.env.SMTP_PASS || "pkbv yhla onec hxzj";
    const smtpPass = rawPass.replace(/\s+/g, "");

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Clean phone number for WhatsApp link
    const cleanPhoneDigits = clientPhone.replace(/[^0-9]/g, "");
    const waLink = cleanPhoneDigits
      ? `https://wa.me/${cleanPhoneDigits}?text=${encodeURIComponent(
          `Hi ${clientName}, this is the StackBros Studio team! We received your dispatch ticket #${ticketId} regarding ${serviceName}.`
        )}`
      : "";

    // 1. Always append lead to local leads.json backup so no inquiry is ever lost
    try {
      const leadsFile = path.join(process.cwd(), "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        const fileContent = fs.readFileSync(leadsFile, "utf-8");
        leads = JSON.parse(fileContent || "[]");
      }
      leads.push({
        ticketId,
        name: clientName,
        email: clientEmail || "Not provided",
        phone: clientPhone || "Not provided",
        service: serviceName,
        idea: clientIdea,
        budget: budget || "Flexible",
        timeline: timeline || "Flexible",
        submittedAt: submissionTime,
      });
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("Local lead save error:", saveErr);
    }

    // 2. Dispatch email notification directly to stackbros.work@gmail.com
    // Handled in safe try/catch with timeout so network delays NEVER return 500 error to user
    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 7000,
          greetingTimeout: 7000,
          socketTimeout: 7000,
        });

        const emailSubject = `🎟️ New Dispatch Ticket #${ticketId}: ${clientName} — ${serviceName}`;

        // Team Notification (Delivered to stackbros.work@gmail.com)
        const teamMailOptions = {
          from: `"StackBros Dispatch" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: clientEmail.includes("@") ? clientEmail : recipientEmail,
          subject: emailSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #181B46; color: #FAF5EF; border-radius: 8px; overflow: hidden; padding: 32px 28px;">
              <div style="border-bottom: 2px dashed rgba(250, 245, 239, 0.25); padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #B58D55; font-weight: 700;">STACKBROS STUDIO • BOARDING PASS</span>
                  <h1 style="font-size: 26px; font-weight: 800; color: #FAF5EF; margin: 6px 0 0 0;">Dispatch Ticket #${ticketId}</h1>
                </div>
                <div style="background-color: #B58D55; color: #181B46; padding: 6px 14px; border-radius: 4px; font-weight: 800; font-size: 13px; text-transform: uppercase;">
                  PRIORITY 01
                </div>
              </div>

              <div style="background-color: #FAF5EF; color: #181B46; border-radius: 6px; padding: 24px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; width: 150px; color: #181B46;">Passenger / Client:</td>
                    <td style="padding: 8px 0; font-size: 16px; font-weight: 700; color: #181B46;">${clientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #181B46;">WhatsApp / Phone:</td>
                    <td style="padding: 8px 0;">
                      ${
                        clientPhone
                          ? `<a href="tel:${clientPhone}" style="color: #181B46; font-weight: 700; text-decoration: underline;">${clientPhone}</a>
                             ${
                               waLink
                                 ? ` &nbsp;•&nbsp; <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 700; text-decoration: none;">💬 WhatsApp Now ↗</a>`
                                 : ""
                             }`
                          : "<em>Not provided</em>"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #181B46;">Email Address:</td>
                    <td style="padding: 8px 0;">
                      ${
                        clientEmail
                          ? `<a href="mailto:${clientEmail}" style="color: #181B46; font-weight: 600; text-decoration: underline;">${clientEmail}</a>`
                          : "<em>Not provided</em>"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #181B46;">Destination Route:</td>
                    <td style="padding: 8px 0;">
                      <span style="display: inline-block; background-color: #181B46; color: #FAF5EF; padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: 700;">
                        ${serviceName} → PRODUCTION
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #181B46;">Budget &amp; Timeline:</td>
                    <td style="padding: 8px 0; color: #181B46;">${budget || "Flexible"} • ${timeline || "Flexible"}</td>
                  </tr>
                </table>

                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(24, 27, 70, 0.15);">
                  <p style="font-weight: 700; margin: 0 0 8px 0; color: #181B46;">Mission Brief &amp; Requirements:</p>
                  <div style="background-color: rgba(24, 27, 70, 0.05); padding: 14px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #181B46;">${clientIdea}</div>
                </div>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                ${
                  waLink
                    ? `<a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 800; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px; margin-right: 12px;">💬 Quick WhatsApp Chat ↗</a>`
                    : ""
                }
                ${
                  clientEmail
                    ? `<a href="mailto:${clientEmail}?subject=Re:%20StackBros%20Dispatch%20Ticket%20%23${ticketId}" style="display: inline-block; background-color: #FAF5EF; color: #181B46; font-weight: 700; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px;">Reply via Email ↗</a>`
                    : ""
                }
              </div>

              <p style="font-size: 12px; color: rgba(250, 245, 239, 0.5); text-align: center; margin-top: 24px;">
                Dispatched at ${submissionTime} • StackBros Studio (stackbros.work@gmail.com)
              </p>
            </div>
          `,
        };

        await transporter.sendMail(teamMailOptions);

        // Digital Luxury Greeting Card to Client
        if (
          clientEmail &&
          clientEmail.includes("@") &&
          !clientEmail.toLowerCase().includes("prasanna") &&
          clientEmail.toLowerCase() !== recipientEmail
        ) {
          try {
            const clientMailOptions = {
              from: `"StackBros Studio" <${smtpUser}>`,
              to: clientEmail,
              subject: `🎟️ Your StackBros Studio Dispatch Pass & Welcome Card (#${ticketId})`,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #FAF5EF; color: #181B46; border: 2px solid #181B46; border-radius: 8px; overflow: hidden; padding: 0;">
                  <!-- Ticket Top Header -->
                  <div style="background-color: #181B46; color: #FAF5EF; padding: 28px 26px; border-bottom: 3px dashed #B58D55;">
                    <div>
                      <span style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B58D55; font-weight: 700;">STACKBROS STUDIO • BOARDING PASS</span>
                      <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin: 6px 0 0 0;">Welcome aboard, ${clientName}!</h2>
                    </div>
                  </div>

                  <!-- Ticket Body & Greeting Card -->
                  <div style="padding: 28px 26px;">
                    <p style="font-size: 16px; line-height: 1.6; color: #181B46; margin: 0 0 18px 0; font-weight: 500;">
                      Thank you for reaching out to StackBros! Your project brief has been officially stamped &amp; logged under <strong>Dispatch Ticket #${ticketId}</strong>.
                    </p>

                    <div style="background-color: #FFFFFF; border: 1px solid rgba(24, 27, 70, 0.15); border-left: 4px solid #B58D55; padding: 18px 20px; border-radius: 4px; margin: 20px 0;">
                      <div style="font-size: 12px; font-mono; text-transform: uppercase; color: #B58D55; font-weight: 700; margin-bottom: 6px;">
                        MISSION SUMMARY • ${serviceName}
                      </div>
                      <div style="font-size: 14px; font-style: italic; color: #181B46; line-height: 1.6;">
                        &ldquo;${clientIdea}&rdquo;
                      </div>
                    </div>

                    <!-- Warm Lifetime Relationship Note -->
                    <div style="background-color: rgba(181, 141, 85, 0.1); border-radius: 6px; padding: 18px; margin: 24px 0;">
                      <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #181B46;">
                        ✦ Our Promise to You
                      </h3>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #181B46;">
                        Whether it’s launching this project or anything you need in the future — websites, custom software, or AI automations — the StackBros team is here as your reliable technical partner. Whenever an idea hits you, we’re just one message away!
                      </p>
                    </div>

                    <p style="font-size: 15px; line-height: 1.6; color: #181B46; margin: 0 0 20px 0;">
                      Our engineering team is already reviewing your brief. We will reach back with next steps within <strong>2 business hours</strong>.
                    </p>

                    <div style="padding-top: 16px; border-top: 1px solid rgba(24, 27, 70, 0.12); display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <p style="font-size: 14px; font-weight: 700; margin: 0; color: #181B46;">The StackBros Studio Team</p>
                        <a href="mailto:stackbros.work@gmail.com" style="font-size: 13px; color: #B58D55; font-weight: 600; text-decoration: none;">stackbros.work@gmail.com</a>
                      </div>
                      <div style="font-mono; font-size: 11px; text-transform: uppercase; color: rgba(24, 27, 70, 0.6);">
                        PASS #${ticketId} • CERTIFIED
                      </div>
                    </div>
                  </div>
                </div>
              `,
            };
            await transporter.sendMail(clientMailOptions);
          } catch (clientErr) {
            console.warn("Client greeting card email error:", clientErr);
          }
        }
      } catch (smtpErr) {
        console.warn("SMTP send skipped/timed out (lead safely preserved in leads.json):", smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Dispatch ticket #${ticketId} processed and saved.`,
    });
  } catch (error: any) {
    console.error("Enquiry API fatal error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Error processing enquiry." },
      { status: 200 } // Keep 200 so UI never crashes with 500!
    );
  }
}
