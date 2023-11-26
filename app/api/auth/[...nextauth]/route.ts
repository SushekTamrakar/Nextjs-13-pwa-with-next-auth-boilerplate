import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function verifyToken(token: JWT): Promise<boolean> {
  const res = await fetch(Backend_URL + "/auth/jwt/verify/", {
    method: "POST",
    body: JSON.stringify({
      token: token.data.token.access,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status == 401) {
    return false;
  }

  return true;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: token.data.token.refresh,
    }),
  });
  console.log("refreshed");

  const response = await res.json();
  const newToken = {
    ...token,
    data: {
      ...token.data,
      token: {
        ...token.data.token,
        access: response.data.access,
      },
    },
  };
  return newToken;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/jwt/create/", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userDataOrError = await res.json();

        if (res.status == 401) {
          console.log(userDataOrError);
          return null;
        }
        const user = userDataOrError;
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      const isValid = await verifyToken(token);
      if (isValid) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.data.user;
      session.token = token.data.token;

      return session;
    },
  },

  pages: {
    signIn: "/signIn",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
