import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const { user } = session;
    const { email } = user;
    const data = await dbConnect(collectionNames.bookingsCollection).find({ email }).toArray();
    return NextResponse.json(data);
  }
  return NextResponse.json([]);
};

export const POST = async (req) => {
  const body = await req.json();
  const result = await dbConnect(collectionNames.bookingsCollection).insertOne(body);

  return NextResponse.json(result);
};