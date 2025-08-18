"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm({ data }) {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    message: "",
    presentAddress: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      customerName: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      service: data?.title ?? "",
    }));
  }, [session, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Booking Data:", formData);
    const res = await fetch("http://localhost:3000/api/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const postedData = await res.json();
    // console.log("Posted Data:", postedData);

    if (res.status === 200) {
      toast.success("Booking successful!");
      setFormData({
        phone: "",
        date: "",
        message: "",
        presentAddress: "",
      });
    }
  };

  if (status === "loading") {
    return <p className="text-center py-10">Loading booking form...</p>;
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Book Your Service
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
          placeholder="+880 1XXX-XXXXXX"
        />
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
        />
        <input
          type="text"
          name="service"
          value={formData.service}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
        />
        <input
          type="text"
          name="presentAddress"
          required
          value={formData.presentAddress}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
          placeholder="Present Address"
        />
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
          placeholder="Write any special instructions..."
        />
        <button
          type="submit"
          className="w-full bg-[#FF3811] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5c36] transition"
        >
          Confirm Booking (${data?.price})
        </button>
      </form>
    </section>
  );
}
