'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import './page.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Firebase client SDK login
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Firebase login successful:", userCredential.user);

      // Get ID token for backend verification if needed
      const idToken = await userCredential.user.getIdToken();

      // Optional: send ID token to backend for session handling or validation
      // const res = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ idToken }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error || "Backend validation failed");

      setMessage("Login successful!");
      router.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}
