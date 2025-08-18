"use client";
import React from "react";
import { registerUser } from "@/app/actions/auth/registerUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialLogin from "@/app/login/components/SocialLogin";

export default function RegisterForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    toast("Registering...");

    try {
      const result = await registerUser(data);

      if (result) {
        toast.success("Registered successfully!");
        e.target.reset();
        setTimeout(() => router.push("/login"), 1000);
      } else {
        toast.error("User already registered!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <>
      <div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3811]"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3811]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF3811] text-white py-2 px-4 rounded-md hover:bg-[#ff5c36] focus:outline-none focus:ring-2 focus:ring-[#FF3811] focus:ring-offset-2 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Or Sign Up with</p>
          <SocialLogin />

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#FF3811] hover:underline font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
