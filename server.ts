import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;
const SUBMISSIONS_FILE = path.join(process.cwd(), 'contact-submissions.json');

if (!WEB3FORMS_API_KEY) {
  console.warn('Warning: Missing WEB3FORMS_API_KEY in environment. Contact form will use local fallback storage.');
}

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, serviceInterest, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required form fields.' });
  }

  const submission = {
    firstName,
    lastName,
    email,
    serviceInterest: serviceInterest || 'General Information',
    message,
    receivedAt: new Date().toISOString(),
  };

  if (WEB3FORMS_API_KEY) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          name: `${firstName} ${lastName}`.trim(),
          email,
          subject: `MAXFMS Inquiry${serviceInterest ? `: ${serviceInterest}` : ''}`,
          message: `Service Interest: ${serviceInterest || 'General Information'}\n\n${message}`,
        }),
      });

      const bodyText = await response.text();
      let data: unknown = null;
      try {
        data = bodyText ? JSON.parse(bodyText) : null;
      } catch (parseError) {
        console.warn('Web3Forms response was not JSON:', parseError);
      }

      if (!response.ok) {
        const errorMessage = data && typeof data === 'object' && 'message' in data ? (data as any).message : 'Web3Forms API returned an error.';
        console.warn('Web3Forms API error:', errorMessage);
      } else {
        return res.status(200).json(data || { success: true });
      }
    } catch (error) {
      console.error('Web3Forms submission failed:', error);
    }
  }

  try {
    const existing = await fs.readFile(SUBMISSIONS_FILE, 'utf-8').catch(() => '[]');
    const submissions = JSON.parse(existing || '[]');
    submissions.push(submission);
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    return res.status(200).json({ success: true, fallbackStored: true });
  } catch (error) {
    console.error('Failed to store fallback submission:', error);
    return res.status(500).json({ error: 'Unable to submit contact form at this time.' });
  }
});

app.listen(PORT, () => {
  console.log(`Web3Forms proxy running at http://localhost:${PORT}`);
});
