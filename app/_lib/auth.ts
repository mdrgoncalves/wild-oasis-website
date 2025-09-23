import NextAuth, { Session, User } from "next-auth";
import { NextRequest } from "next/server";
import Google from "next-auth/providers/google";

import { createGuest, getGuest } from "./data-service";

type AuthorizedParams = {
  auth: Session | null;
  request?: NextRequest;
};

// type SessionWithUserId = Session & {
//   user: User & { guestId?: string };
// };

type SessionParams = {
  session: Session;
  user: User;
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
    async signIn({ user }: { user: User }) {
      // This callback can be used to handle sign-in logic
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }: SessionParams) {
      // Customize the session object here
      if (!session.user) session.user = user;
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
