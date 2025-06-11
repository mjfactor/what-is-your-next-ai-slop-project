"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModernTextarea } from "@/components/modern-textarea";

export default function Home() {
  const [textValue, setTextValue] = useState("");
  const [letAIDecide, setLetAIDecide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectSubmission = async (projectIdea: string) => {
    if (!projectIdea.trim()) return;

    if (letAIDecide) {
      setIsLoading(true);
      try {
        console.log('🚀 Submitting project idea:', projectIdea);

        const response = await fetch('/api/let-ai-decide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectIdea,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('✅ Route.ts Response:', data);
        } else {
          console.error('❌ Route.ts Response Error:', data);
        }
      } catch (error) {
        console.error('🔥 API Call Error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For future manual selection logic
    }
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex items-center justify-center min-h-screen p-8"
      >        <div className="w-full max-w-4xl">
          <ModernTextarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="A web app with Next.js, Vercel AI SDK, and shadcn/ui for a task management system"
            letAIDecide={letAIDecide}
            onToggleAIDecide={setLetAIDecide}
            isLoading={isLoading}
            onSubmit={handleProjectSubmission}
          />
        </div>
      </motion.div>
    </main>
  );
}
