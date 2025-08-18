// "use client";
import MyBookingsTable from "@/components/tables/MyBookingsTable";
import { headers } from "next/headers";
import React from "react";

const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/service", {
      headers: await headers(),
    });
    const d = await res.json();
    return d;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }
};

export default async function MyBookings() {
  const data = await fetchData();

  return (
    <div className="p-4">
      <MyBookingsTable bookings={data} />
    </div>
  );
}
