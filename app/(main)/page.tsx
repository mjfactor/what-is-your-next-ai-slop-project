"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserProfile from "@/components/user-profile";


export default function Home() {
  const router = useRouter();
  const [projectIdea, setProjectIdea] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { submit, isLoading, stop } = useObject({
    api: '/api/generate',
    schema: ProjectStructureSchema,
    onFinish: ({ object, error }) => {
      if (error) {
        console.error("Schema validation error:", error);
      } else if (object && object.id) {
        console.log("Project structure generated successfully:", object);
        // Redirect to the dynamic page with the generated ID
        router.push(`/${object.id}`);
      }
    }
  });
  const handleSubmit = async () => {
    if (!projectIdea.trim()) {
      toast.error("Please enter a project idea.");
      return;
    }

    // Validate with AI first
    setIsValidating(true);
    try {
      const response = await fetch('/api/validate-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectIdea }),
      });

      const result = await response.json();

      if (!result.valid) {
        toast.error(result.message);
        setIsValidating(false);
        return;
      }

      // If validation passes, proceed with generating the project plan
      toast.success("Generating your project plan...");
      setIsValidating(false);
      submit(projectIdea);
    } catch (error) {
      console.error('Validation error:', error);
      toast.error("An error occurred while validating your project idea. Please try again.");
      setIsValidating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }; return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />      {/* User Profile Component */}
      <UserProfile disabled={isLoading || isValidating} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center min-h-screen py-12"
      ><div className="w-full max-w-5xl px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-2xl mx-auto"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                  AI Project Planner
                </h1>
                <p className="text-lg text-muted-foreground">
                  Describe your project idea and let AI help you plan and structure it
                </p>
              </motion.div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-8 shadow-2xl"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-6"
                >
                  {/* Project Idea Input */}
                  <div className="space-y-2">
                    <Textarea
                      id="project-idea"
                      placeholder="Describe your project idea here... (e.g., 'A social media dashboard using React and Node.js' or 'Mobile app for fitness tracking')"
                      value={projectIdea}
                      onChange={(e) => setProjectIdea(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-32 resize-none text-base"
                      disabled={isLoading || isValidating}
                    />
                  </div>                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="space-y-3"
                  >
                    <Button
                      onClick={handleSubmit}
                      disabled={!projectIdea.trim() || isLoading || isValidating}
                      className="w-full h-12 text-base font-medium"
                      size="lg"
                    >
                      {isValidating ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Validating Idea...
                        </motion.div>
                      ) : isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing Project...
                        </motion.div>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Generate Project Plan
                        </motion.span>
                      )}
                    </Button>

                    {/* Stop Button - Only show when AI is generating */}
                    <AnimatePresence>
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            onClick={stop}
                            variant="outline"
                            size="sm"
                            className="w-full h-10 text-sm font-medium border-destructive/20 text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Stop Generation
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
