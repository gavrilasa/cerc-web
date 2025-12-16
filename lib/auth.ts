import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Security: Restrict signup to admin emails only if needed
  /* user: {
    additionalFields: {
      role: { type: "string", defaultValue: "admin" }
    }
  } 
  */
});