import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer";
import ReactLenis from "lenis/react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactLenis root />
      <Navbar />
      <main className="min-h-screen"> 
          {children}
      </main>
      <Footer />
    </>
  );
}