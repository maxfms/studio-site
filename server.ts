import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;

if (!WEB3FORMS_API_KEY) {
  console.error('Missing WEB3FORMS_API_KEY in environment. Create a .env file with this value.');
  process.exit(1);
}

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, serviceInterest, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required form fields.' });
  }

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
      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json(data || { success: true });
  } catch (error) {
    console.error('Web3Forms submission failed:', error);
    return res.status(502).json({ error: 'Unable to submit contact form at this time.' });
  }
});

app.listen(PORT, () => {
  console.log(`Web3Forms proxy running at http://localhost:${PORT}`);
});
