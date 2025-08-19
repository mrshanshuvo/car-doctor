import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/bookings/[id]
export const GET = async (req, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const booking = await dbConnect(collectionNames.bookingsCollection).findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    // ✅ Validate ownership
    if (booking.email !== session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("GET booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};

// PATCH /api/bookings/[id]
export const PATCH = async (req, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const collection = dbConnect(collectionNames.bookingsCollection);

    const booking = await collection.findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    // ✅ Validate ownership
    if (booking.email !== session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("PATCH booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
