"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionNames.usersCollection);
  // validation
  const { email } = payload;
  if (!email) {
    return null;
  }
  const user = await usersCollection.findOne({ email: payload.email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    await usersCollection.insertOne(payload);
    return payload;
  }

  return null;

};