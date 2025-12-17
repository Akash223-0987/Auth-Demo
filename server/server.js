import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.post("/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    res.json({
      success: true,
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});