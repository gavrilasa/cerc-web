// app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    await authClient.signIn.email({ 
      email, 
      password 
    }, {
      onSuccess: () => {
        router.push("/admin/dashboard");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg w-full max-w-md border border-neutral-200 dark:border-neutral-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-neutral-800 dark:text-neutral-100">
          Admin Access
        </h1>
        <div className="space-y-4">
            <input 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-600" 
              placeholder="admin@cerc.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-600" 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-neutral-900 text-white p-3 rounded-lg hover:bg-neutral-800 font-bold flex justify-center items-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>
        </div>
      </div>
    </div>
  );
}