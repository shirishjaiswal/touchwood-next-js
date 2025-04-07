'use server';

import nodemailer from 'nodemailer';

export interface EmailData {
  from: string;
  to: string | string[];
  subject: string;
  template: string;
  pass: string;
}

export async function sendEmail({ from, to, subject, template, pass }: EmailData): Promise<{ message: string }> {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: from, pass: pass },
  });

  const mailOptions = {
    from: from,
    to,
    subject: subject,
    html: template,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
