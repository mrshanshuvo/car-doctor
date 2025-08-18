import React from "react";
import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 relative p-12 h-[500px]">
        <Image
          src="/assets/images/login/login.svg"
          alt="Registration illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right side - Form */}
      <LoginForm />
    </div>
  );
}
