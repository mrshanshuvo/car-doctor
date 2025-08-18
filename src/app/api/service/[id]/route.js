import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const data = await dbConnect(collectionNames.servicesCollection).findOne({ _id: new ObjectId(id) });
  return NextResponse.json(data);
}

export const DELETE = async (req, { params }) => {
  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const { id } = await params;
  const query = { _id: new ObjectId(id) };

  const session = await getServerSession(authOptions);
  const currentBooking = await bookingsCollection.findOne(query);

  const isOwnerValid = session?.user?.email === currentBooking?.email;

  if (isOwnerValid) {
    const deleteResponse = await bookingsCollection.deleteOne(query);
    revalidatePath("/myBookings");
    return NextResponse.json(deleteResponse);
  }
  return NextResponse.json({ success: false, message: "Unauthorized" });
}