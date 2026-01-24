// app/(auth)/login/page.tsx
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-950 to-black" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-neutral-800/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linear-to-tr from-neutral-800/10 to-transparent" />
      
      {/* Back Button */}
      <div className="relative z-10 p-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-md text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md">
          
          {/* Logo Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-neutral-800 rounded-2xl flex items-center justify-center border border-neutral-700">
              <Image
                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013541/Logo-CERC-presspadding_r027nm.png"
                alt="CERC Logo"
                width={32}
                height={32}
                className="opacity-80"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Login to CERC Admin CMS
            </h1>
          </div>

          {/* Form */}
          <div className="space-y-3 mb-6">
            {/* Email Input */}
            <input 
              type="email"
              className="w-full px-4 py-3.5 bg-transparent border border-neutral-700 rounded-xl focus:border-neutral-500 outline-none text-white placeholder:text-neutral-600 transition-colors" 
              placeholder="Your Username" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            {/* Password Input */}
            <input 
              type="password"
              className="w-full px-4 py-3.5 bg-transparent border border-neutral-700 rounded-xl focus:border-neutral-500 outline-none text-white placeholder:text-neutral-600 transition-colors" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Sign In Button - White */}
          <button 
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full bg-white text-neutral-900 py-3.5 rounded-full hover:bg-neutral-200 font-semibold flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign in"}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-neutral-600 mt-8 leading-relaxed">
            You acknowledge that you read, and agree, to our{" "}
            <Link href="#" className="text-neutral-400 hover:text-white underline">Terms of Service</Link>
            {" "}and our{" "}
            <Link href="#" className="text-neutral-400 hover:text-white underline">Privacy Policy</Link>.
          </p>
          
        </div>
      </div>
    </div>
  );
}