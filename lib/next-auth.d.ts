import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
    };

    token: {
      access: string;
      refresh: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    status: string;
    code: number;
    data: {
      user: {
        id: number;
        email: string;
        username: string;
      };

      token: {
        refresh: string;
        access: string;
      };
    };
    message: string;
  }
}
