// api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_TO) {
  throw new Error('Missing environment variables');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body;

  const msg = {
    to: process.env.EMAIL_TO, // Change to your recipient
    from: email, // Change to your verified sender
    subject: `New message from ${name}`,
    text: message,
  };

  await sgMail.send(msg);

  res.status(200).json({ status: 'Ok' });
}