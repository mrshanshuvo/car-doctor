import React from "react";
import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
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
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#FF3811]">
            Sign Up
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
