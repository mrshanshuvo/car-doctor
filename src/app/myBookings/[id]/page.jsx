import UpdateBookings from "@/components/forms/UpdateBookings";
import { headers } from "next/headers";
import React from "react";

export default async function UpdateBookingPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/myBookings/${id}`, {
    headers: await headers(),
  });
  const data = await res.json();
  return (
    <>
      <UpdateBookings booking={data.data} />
    </>
  );
}
