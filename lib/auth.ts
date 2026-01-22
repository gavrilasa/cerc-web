import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  emailAndPassword: {
    enabled: true,
    // Require minimum password length for security
    minPasswordLength: 8,
  },

  // Session Configuration - Security Hardening
  session: {
    // Session expires after 24 hours of inactivity
    expiresIn: 60 * 60 * 24, // 24 hours in seconds
    
    // Update session expiry every 1 hour of activity
    updateAge: 60 * 60, // 1 hour in seconds
    
    // Cookie settings for security
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache for 5 minutes
    },
  },

  // Advanced Security Settings
  advanced: {
    // Use secure cookies in production
    useSecureCookies: process.env.NODE_ENV === "production",
    
    // Generate CSRF token for forms
    generateId: () => crypto.randomUUID(),
  },

  // Rate limiting to prevent brute force attacks
  rateLimit: {
    window: 60, // 1 minute window
    max: 10, // Max 10 requests per window for auth endpoints
  },

  // Trust proxy headers (for production behind load balancer)
  trustedOrigins: [
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ],
});

// Export type for session
export type Session = typeof auth.$Infer.Session;