import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const data = await dbConnect(collectionNames.bookingsCollection).findOne({ _id: new ObjectId(id) });
  return NextResponse.json(data);
}

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const data = await dbConnect(collectionNames.bookingsCollection).updateOne({ _id: new ObjectId(id) }, { $set: body });
  return NextResponse.json(data);
}