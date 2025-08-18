import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CarDoctor",
  description: "Car Doctor NextJS App with MongoDB and NextAuth JWT Authentication System with Geist UI and Tailwind CSS Framework",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              className: "shadow-lg",
              style: {
                padding: "16px",
                borderRadius: "8px",
              },
              success: {
                icon: "✅",
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                },
              },
              error: {
                icon: "❌",
                style: {
                  background: "#fef2f2",
                  color: "#b91c1c",
                },
              },
            }}
          />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
