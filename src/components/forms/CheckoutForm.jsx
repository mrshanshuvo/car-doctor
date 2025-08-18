"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm({ data }) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  // Prefill service + user info
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service: data?.title || "",
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    }));
  }, [data, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = {
      ...formData,
      serviceId: data?._id,
      price: data?.price,
    };

    const toastId = toast.loading("Submitting booking...");

    try {
      // Example fake API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booking Data:", booking);

      toast.success("Your booking has been submitted!", { id: toastId });

      // Reset form but keep defaults
      setFormData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        date: "",
        service: data?.title || "",
        message: "",
      });
    } catch (error) {
      toast.error("❌ Failed to submit booking", { id: toastId });
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
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
            placeholder="+880 1XXX-XXXXXX"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking Date
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <input
            type="text"
            name="service"
            value={formData.service}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Present Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Present Address
          </label>
          <input
            type="text"
            name="presentAddress"
            required
            value={formData.presentAddress}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
            placeholder="Present Address"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF3811] focus:outline-none"
            placeholder="Write any special instructions..."
          ></textarea>
        </div>

        {/* Submit */}
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
