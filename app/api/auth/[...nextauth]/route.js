import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/authOptions";



const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],


 callbacks: {
  async jwt({ token, user, trigger, session }) {
    if (trigger === "update" && session?.remember) {
      token.remember = true;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.sub;
    session.remember = token.remember || false;
    return session;
  }
},
session: {
  strategy: "jwt",
  maxAge: 24 * 60 * 60, // default 1 din
},


  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
