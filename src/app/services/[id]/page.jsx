import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ServiceDetailsPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/service/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();

  return (
    <div>
      {/* Banner Section */}
      <section className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <Image
          src={"/assets/images/checkout/checkout.png"}
          alt="Banner"
          fill
          sizes="100%"
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #151515 0%, rgba(21,21,21,0) 100%)",
          }}
        />

        {/* Banner Title */}
        <h1 className="absolute left-4 sm:left-8 bottom-12 sm:bottom-16 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Service Details
        </h1>

        {/* Breadcrumb Trapezium Button */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            }}
            className="bg-[#FF3811] text-white px-4 sm:px-6 md:px-8 py-1 sm:py-2 font-semibold hover:bg-[#ff5c36] transition text-sm sm:text-base md:text-lg"
          >
            Home / Service Details
          </button>
        </div>
      </section>

      {/* Service Details */}
      <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col md:flex-row gap-8">
        {/* Left: Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{data.title}</h2>
            <p className="mb-4">{data.description}</p>
            <p className="font-bold text-lg sm:text-xl text-[#FF3811]">
              ${data.price}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 md:mt-auto md:self-end self-center">
            <Link href={`/checkout/${data._id}`}>
              <button className="bg-[#FF3811] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#ff5c36] transition">
                Checkout
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative w-full h-64 sm:h-72 md:h-auto">
          <Image
            src={data.img}
            alt={data.title}
            fill
            sizes="100%"
            className="object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
