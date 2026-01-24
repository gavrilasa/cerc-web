"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleSignOut() {
  // Clear the session cookie
  const cookieStore = await cookies();
  
  // Delete the better-auth session cookie
  cookieStore.delete("better-auth.session_token");
  
  // Redirect to login page
  redirect("/login");
}