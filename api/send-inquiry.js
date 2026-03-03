import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate required fields
    const { name, email, phone, interest, message, agentName, agentEmail } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields. Name, email, and message are required.' 
      });
    }

    // Escape user input for HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeInterest = interest ? escapeHtml(interest) : '';
    const safeMessage = escapeHtml(message);
    const safeAgentName = agentName ? escapeHtml(agentName) : '';

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

    console.log('MailerSend initialized, API key present:', !!apiKey);

    const sender = new Sender('admin@westchesterselect.com', 'Westchester Select Realty');

    // Determine recipient(s) — if an agent is specified, send to them + admin; otherwise just admin
    const recipients = [new Recipient('admin@westchesterselect.com', 'Westchester Select Realty')];
    if (agentEmail) {
      recipients.push(new Recipient(agentEmail, agentName || 'Agent'));
    }

    const subjectLine = safeAgentName
      ? `New Inquiry for ${safeAgentName} – Westchester Select Realty`
      : 'New Inquiry – Westchester Select Realty';

    // 1. Send email to admin (and agent if specified)
    const adminEmailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject(subjectLine)
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
              <h1>${safeAgentName ? `New Inquiry for ${safeAgentName}` : 'New Inquiry Received'}</h1>
            </div>
            <div class="content">
              ${safeAgentName ? `
              <div class="field">
                <span class="label">Sent to Agent:</span>
                <div class="value">${safeAgentName}</div>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${safeEmail}</div>
              </div>
              ${safePhone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value">${safePhone}</div>
              </div>
              ` : ''}
              ${safeInterest ? `
              <div class="field">
                <span class="label">Interest:</span>
                <div class="value">${safeInterest}</div>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${safeMessage}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
      .setText(`
${safeAgentName ? `New Inquiry for ${safeAgentName}` : 'New Inquiry'} – Westchester Select Realty

${safeAgentName ? `Sent to Agent: ${safeAgentName}\n` : ''}Name: ${safeName}
Email: ${safeEmail}
${safePhone ? `Phone: ${safePhone}` : ''}
${safeInterest ? `Interest: ${safeInterest}` : ''}

Message:
${safeMessage}
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
              <p>Dear ${safeName},</p>
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
    console.log('Attempting to send emails...');
    let adminResponse, confirmationResponse;
    
    try {
      [adminResponse, confirmationResponse] = await Promise.all([
        mailersend.email.send(adminEmailParams),
        mailersend.email.send(confirmationEmailParams),
      ]);
      
      console.log('Emails sent successfully:', {
        admin: adminResponse?.statusCode || adminResponse?.status,
        confirmation: confirmationResponse?.statusCode || confirmationResponse?.status,
      });
    } catch (emailError) {
      console.error('MailerSend API error:', emailError);
      console.error('Error response:', emailError.response?.data || emailError.response);
      throw emailError;
    }

    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Your inquiry has been sent successfully. You will receive a confirmation email shortly.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data || error.response,
      status: error.statusCode || error.response?.status,
      statusText: error.response?.statusText,
      body: error.body,
    });
    
    // Check for specific MailerSend errors
    let errorMessage = 'Failed to send inquiry. Please try again later or contact us directly.';
    
    // Handle MailerSend API errors (they use a different structure)
    if (error.body) {
      const mailerError = error.body;
      console.error('MailerSend error body:', mailerError);
      
      if (mailerError.message) {
        // Check for domain verification error
        if (mailerError.message.includes('domain must be verified')) {
          errorMessage = 'Email service configuration error. Please contact support.';
          console.error('DOMAIN VERIFICATION REQUIRED: The sender email domain must be verified in MailerSend');
        } else {
          errorMessage = `Email service error: ${mailerError.message}`;
        }
      }
    } else if (error.response?.data) {
      const mailerError = error.response.data;
      console.error('MailerSend error details:', mailerError);
      
      if (mailerError.message) {
        errorMessage = `Email service error: ${mailerError.message}`;
      }
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    // Return error response
    return res.status(error.statusCode || 500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error.body?.message || error.message) : undefined
    });
  }
}
