import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import Link from "next/link";

export default async function ServicesSection() {
  const services = await dbConnect(collectionNames.servicesCollection)
    .find()
    .toArray();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#FF3811]">
          Service
        </h1>
        <h2 className="text-5xl font-bold text-center mb-4">
          Our Service Area
        </h2>
        <p className="text-center mb-8 text-gray-600">
          The majority have suffered alteration in some form, by injected
          humour, or randomized <br /> words which don't look even slightly
          believable.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#FF3811] flex flex-col relative"
            >
              {/* Right arrow button without bg */}
              <Link
                href={`/services/${service._id}`}
                className="absolute bottom-4 right-4 p-2 text-[#FF3811] rounded-full hover:text-[#FF3811] transition z-10"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </Link>

              <div className="relative w-full h-48">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="100%"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h2>
                </div>
                <p className="font-bold text-lg text-[#FF3811]">
                  ${service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-white border-2 border-[#FF3811] text-[#FF3811] font-semibold px-6 py-2 rounded hover:bg-[#FF3811] hover:text-white transition">
            More Services
          </button>
        </div>
      </div>
    </section>
  );
}
