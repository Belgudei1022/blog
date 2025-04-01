import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Custom property
    } & DefaultSession["user"];
    token?: string; // Add JWT token to session
  }

  interface User {
    id: string; // Ensure User type includes id
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Add id to JWT
  }
}