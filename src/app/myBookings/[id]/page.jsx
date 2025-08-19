import UpdateBookings from "@/components/forms/UpdateBookings";
import React from "react";

export default async function UpdateBookingPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/myBookings/${id}`);
  const data = await res.json();
  return (
    <>
      <UpdateBookings booking={data} />
    </>
  );
}
