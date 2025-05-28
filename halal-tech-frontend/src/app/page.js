'use client';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Home() {
  const router = useRouter();
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">WELCOME TO</h1>
        <h2 className="heading">💻 Halal Tech</h2>

        <p className="paragraph">
          A tech world where you don’t have to choose between your identity and your ambition.
        </p>

        <p className="paragraph">
          Empowering Muslim Women in Tech. Connecting Values-Driven Companies with Exceptional Talent.
        </p>

        <div className="text-left mb-8 max-w-3xl mx-auto">
          <p className="section-title">For Muslim Women in Tech:</p>
          <p className="section-text">
            Find tech jobs that respect your faith, protect your mental well-being, and empower your career growth – without compromising your values.
          </p>

          <p className="section-title">For Muslim-Led Startups & Companies:</p>
          <p className="section-text">
            Hire top-tier Muslim women developers who bring not just skills, but integrity, and purpose aligned with your mission and values.
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-10">Faith-first. Mental health–centered. Impact-driven.</p>

        <div className="flex justify-center space-x-8">
          <button onClick={() => router.push('/signup')} className="button">
            Sign Up
          </button>
          <button onClick={() => router.push('/login')} className="button">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
