"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiChevronDown } from "react-icons/hi"; // Hamburger + dropdown icon
import { FiLogIn, FiUserPlus, FiCalendar, FiUser } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navMenu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
    { name: "My Bookings", link: "/myBookings" },
  ];

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-8 relative">
      {/* Start: Logo + Mobile Dropdown */}
      <div className="navbar-start flex items-center">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <HiMenu className="w-6 h-6 text-[#FF3811]" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 space-y-2"
          >
            {navMenu.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="text-[#FF3811] font-medium">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/">
          <Image
            priority
            src="/assets/logo.svg"
            width={107}
            height={87}
            alt="logo"
          />
        </Link>
      </div>

      {/* Center: Menu (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {navMenu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="text-gray-700 hover:text-[#FF3811] font-medium transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* End: Action Buttons */}
      <div className="navbar-end flex items-center space-x-2">
        {status === "authenticated" ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50"
            >
              <FiUser className="w-5 h-5" />
              <span>{session.user.name}</span>
              <HiChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-10">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="btn bg-[#FF3811] text-white hover:bg-[#ff5c36] border-none flex items-center space-x-1"
            >
              <FiLogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="btn bg-[#FF3811] text-white hover:bg-[#ff5c36] border-none flex items-center space-x-1"
            >
              <FiUserPlus className="w-5 h-5" />
              <span>Register</span>
            </Link>
          </>
        )}

        <Link
          href="/appointment"
          className="btn bg-[#FF3811] text-white hover:bg-[#ff5c36] border-none flex items-center space-x-1"
        >
          <FiCalendar className="w-5 h-5" />
          <span>Appointment</span>
        </Link>
      </div>
    </div>
  );
}
