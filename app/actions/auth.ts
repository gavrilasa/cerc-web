"use server";

import { redirect } from "next/navigation";
// Import fungsi signOut dari library auth Anda (NextAuth/BetterAuth/Lucia) jika ada
// import { signOut } from "@/auth"; 

export async function handleSignOut() {
  // await signOut(); // Uncomment baris ini jika menggunakan library auth
  redirect("/"); // Redirect ke halaman utama setelah logout
}