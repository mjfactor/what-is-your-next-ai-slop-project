"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModernTextarea } from "@/components/modern-textarea";

export default function Home() {
  const [textValue, setTextValue] = useState("");

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex items-center justify-center min-h-screen p-8"
      >
        <div className="w-full max-w-4xl">
          <ModernTextarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="A web app with Next.js, Vercel AI SDK, and shadcn/ui for a task management system"
          />
        </div>
      </motion.div>
    </main>
  );
}
