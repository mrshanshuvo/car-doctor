"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteBooking({ id }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  };
  return (
    <>
      <button
        onClick={() => handleDelete(id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
      >
        Delete
      </button>
    </>
  );
}
