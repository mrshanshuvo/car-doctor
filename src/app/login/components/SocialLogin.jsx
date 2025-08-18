"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  return (
    <div className="flex justify-center space-x-4">
      {/* Google */}
      <button
        type="button"
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <FcGoogle className="w-5 h-5" />
      </button>

      {/* GitHub */}
      <button
        type="button"
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <FaGithub className="w-5 h-5 text-[#181717]" />
      </button>
    </div>
  );
}
