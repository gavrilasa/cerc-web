"use client";

import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/shadcn-io/terminal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration = last delay (6500) + explicit wait time to read (e.g. 1500ms)
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for exit animation
    }, 8000);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4"
    >
      <Terminal>
        <AnimatedSpan delay={0}>$ npm install cerc-website</AnimatedSpan>
        <TypingAnimation delay={1000} duration={50}>
          Installing dependencies...
        </TypingAnimation>
        <AnimatedSpan delay={3000}>
          ✓ Package installed successfully
        </AnimatedSpan>
        <AnimatedSpan delay={3500}>$ npm run dev</AnimatedSpan>
        <TypingAnimation delay={4500} duration={50}>
          Starting development server...
        </TypingAnimation>
        <AnimatedSpan delay={6500} className="text-green-500">
          🚀 Server ready at https://cerc-undip.com
        </AnimatedSpan>
      </Terminal>
    </motion.div>
  );
}