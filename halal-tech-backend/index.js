const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (make sure your serviceAccountKey.json is correct)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Your frontend origin
app.use(express.json());

// Signup route example
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Save additional info in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      firstName,
      lastName,
      createdAt: new Date(),
    });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
});

// LOGIN route - POST only
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Firebase Admin SDK does NOT have signInWithEmailAndPassword,
    // you verify client tokens or custom tokens here.
    // For demo, just respond success.

    // Normally, you would verify the user's ID token from frontend.
    // So here, just respond OK for demonstration:
    res.json({ message: "Login route hit successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Optional: disallow GET on login to clarify usage
app.get("/api/auth/login", (req, res) => {
  res.status(405).json({ error: "GET method not allowed on /api/auth/login" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
