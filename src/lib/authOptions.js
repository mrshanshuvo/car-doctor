
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/actions/auth/loginUser";
import { signIn } from "next-auth/react";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        return user || null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;
        const usersCollection = dbConnect(collectionNames.usersCollection);
        const existingUser = await usersCollection.findOne({ providerAccountId });
        if (!existingUser) {
          await usersCollection.insertOne({ providerAccountId, provider, email, image, name });
        }
        return true;
      }
      return true;
    },
  }
};