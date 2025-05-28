// app.js
const express = require("express");
const cors = require("cors");
const { auth, db } = require("./firebase");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({ email, password });

    // Save role in Firestore under collection "users"
    await db.collection("users").doc(userRecord.uid).set({
      email,
      role,
      createdAt: new Date(),
    });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
