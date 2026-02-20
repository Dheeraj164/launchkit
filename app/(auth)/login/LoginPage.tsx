"use client";

import { useState } from "react";

import LoginSection from "./LoginSection";
import SignupSection from "./SignupSection";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => setIsSignUp(!isSignUp);
  return (
    <div className="relative w-full max-w-4xl h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Sign Up Form */}
      <SignupSection isSignUp />

      {/* Sign In Form */}
      <LoginSection isSignUp />

      {/* Overlay Container */}
      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${
          isSignUp ? "-translate-x-full" : ""
        }`}
      >
        <div
          className={`relative -left-full h-full w-[200%] bg-linear-to-r from-indigo-500 to-purple-600 text-white transform transition-transform duration-700 ease-in-out ${
            isSignUp ? "translate-x-1/2" : "translate-x-0"
          }`}
        >
          <div className="flex h-full">
            {/* Left Panel */}
            <OverlayPanel
              title="Hello,"
              description="Enter your personal details and start your journey with us"
              footerText="If you already have an account"
              buttonText="Sign In"
              onClick={toggleMode}
            />
            {/* Right Panel */}
            <OverlayPanel
              title="Welcome Back!"
              description="To keep connected with us please login with your personal info"
              footerText="If you don't have an account"
              buttonText="Sign Up"
              onClick={toggleMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayPanel({
  title,
  description,
  footerText,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  footerText: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full px-12 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-8 text-sm leading-relaxed">{description}</p>
      <div>
        <p className="py-2 text-sm opacity-80">{footerText}</p>
        <button
          onClick={onClick}
          className="px-10 py-2 border-2 border-white rounded-full font-semibold uppercase tracking-wider hover:bg-white hover:text-indigo-600 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
