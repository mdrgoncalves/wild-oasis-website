import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";
import Google from "next-auth/providers/google";

type AuthorizedParams = {
  auth: Session | null;
  request?: NextRequest;
};

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: AuthorizedParams) {
      return !!auth?.user;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
