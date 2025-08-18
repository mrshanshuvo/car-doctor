"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        toast.success("Logged in successfully!");
        setTimeout(() => router.push("/"), 1000);
      } else {
        // More specific error messages
        if (result?.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else if (result?.error === "UserNotFound") {
          toast.error("No account found with this email");
        } else if (result?.error === "AccountNotVerified") {
          toast.error("Please verify your email first");
        } else {
          toast.error(result?.error || "Login failed");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 429) {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FF3811]">Login</h1>
          </div>

          {/* Credentials Form */}
          <form className="space-y-6" onSubmit={handleCredentialsLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3811]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3811]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF3811] text-white py-2 px-4 rounded-md hover:bg-[#ff5c36] focus:outline-none focus:ring-2 focus:ring-[#FF3811] focus:ring-offset-2 transition"
            >
              Login
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">Or Login with</p>
            <SocialLogin />

            <div className="mt-4 text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#FF3811] hover:underline font-medium"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
