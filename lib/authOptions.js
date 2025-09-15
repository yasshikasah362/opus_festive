import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongoClient";
import { connectToDatabase } from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // ✅ Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ✅ Credentials login (MongoDB users)
    CredentialsProvider({
      id: "credentials", // 👈 default provider id
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),

    // ✅ Opus Credentials login
    CredentialsProvider({
      id: "opus", // 👈 alag ID
      name: "Opus",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await signin(credentials.username, credentials.password);

          if (res.data?.status === 200) {
            return {
              id: credentials.username,
              name: credentials.username,
              email: `${credentials.username}@opus.local`, // fake email to satisfy schema
              opusToken: res.data.token,
            };
          }

          throw new Error(res.data?.message || "Opus login failed");
        } catch (err) {
          console.error("Opus login error:", err.message);
          throw new Error("Invalid Opus credentials");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Agar Opus user login kare to opusToken attach karo
      if (user?.opusToken) {
        token.opusToken = user.opusToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.opusToken) {
        session.opusToken = token.opusToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
