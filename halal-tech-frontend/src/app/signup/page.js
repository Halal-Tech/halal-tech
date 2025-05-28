'use client';
import { useState } from "react";
import { auth } from "../../lib/firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import './page.css';

export default function Signup() {
  // State variables for user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  // Handle signup event
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase user created successfully.");

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Backend signup failed");
      }

      setMessage("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign up if you are a first-time user</h2>
        <form onSubmit={handleSignup} className="signup-form grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input col-span-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input col-span-2"
          />
          <button type="submit" className="signup-button col-span-2">Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}
