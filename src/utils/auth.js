import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signup",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      redirect_uri: "http://localhost:3000/api/auth/callback/google",
    }),
    Credentials({
      async authorize(credentials) {
        if (credentials.id && credentials.password) {
        }
        return null;
      },
    }),
  ],
  secret: "test",
};
