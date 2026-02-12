import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate required fields
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields. Name, email, and message are required.' 
      });
    }

    // Validate API key
    const apiKey = process.env.MAILERSEND_API_KEY;
    if (!apiKey) {
      console.error('MAILERSEND_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize MailerSend
    const mailersend = new MailerSend({
      apiKey: apiKey,
    });

    const sender = new Sender('admin@westchesterselect.com', 'Westchester Select Realty');

    // 1. Send email to admin
    const adminRecipient = new Recipient('admin@westchesterselect.com', 'Westchester Select Realty');
    
    const adminEmailParams = new EmailParams()
      .setFrom(sender)
      .setTo([adminRecipient])
      .setSubject('New Inquiry – Westchester Select Realty')
      .setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1a1a1a; margin-bottom: 5px; display: block; }
            .value { color: #333; padding: 10px; background-color: #fff; border-left: 3px solid #d4af37; }
            .message-box { padding: 15px; background-color: #fff; border-left: 3px solid #d4af37; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Inquiry Received</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              ${interest ? `
              <div class="field">
                <span class="label">Interest:</span>
                <div class="value">${interest}</div>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
      .setText(`
New Inquiry – Westchester Select Realty

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${interest ? `Interest: ${interest}` : ''}

Message:
${message}
      `);

    // 2. Send confirmation email to user
    const userRecipient = new Recipient(email, name);
    
    const confirmationEmailParams = new EmailParams()
      .setFrom(sender)
      .setTo([userRecipient])
      .setSubject('Thank You for Contacting Westchester Select Realty')
      .setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #1a1a1a; color: #d4af37; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { padding: 40px 30px; background-color: #f9f9f9; }
            .content p { margin-bottom: 20px; color: #333; font-size: 16px; }
            .footer { background-color: #1a1a1a; color: #ffffff; padding: 30px 20px; text-align: center; }
            .footer a { color: #d4af37; text-decoration: none; }
            .footer a:hover { text-decoration: underline; }
            .divider { height: 2px; background: linear-gradient(to right, #d4af37, #d4af37); margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Westchester Select Realty</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to Westchester Select Realty. We have successfully received your inquiry and appreciate your interest in our services.</p>
              <p>A member of our team will review your message and contact you shortly to assist you with your real estate needs.</p>
              <div class="divider"></div>
              <p>If you have any urgent questions, please feel free to contact us directly.</p>
              <p>We look forward to helping you with your real estate journey in Westchester County.</p>
              <p>Best regards,<br><strong>The Westchester Select Realty Team</strong></p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;">Visit us online:</p>
              <p style="margin: 0;"><a href="https://westchesterselect.com">westchesterselect.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `)
      .setText(`
Thank You for Contacting Westchester Select Realty

Dear ${name},

Thank you for reaching out to Westchester Select Realty. We have successfully received your inquiry and appreciate your interest in our services.

A member of our team will review your message and contact you shortly to assist you with your real estate needs.

If you have any urgent questions, please feel free to contact us directly.

We look forward to helping you with your real estate journey in Westchester County.

Best regards,
The Westchester Select Realty Team

Visit us online: https://westchesterselect.com
      `);

    // Send both emails
    const [adminResponse, confirmationResponse] = await Promise.all([
      mailersend.email.send(adminEmailParams),
      mailersend.email.send(confirmationEmailParams),
    ]);

    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Your inquiry has been sent successfully. You will receive a confirmation email shortly.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return user-friendly error message
    return res.status(500).json({ 
      error: 'Failed to send inquiry. Please try again later or contact us directly.' 
    });
  }
}
