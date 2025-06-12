"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';
import { ProjectResult } from "@/components/project-result/ProjectResult";


export default function Home() {
  const [projectIdea, setProjectIdea] = useState("");

  const { object, submit, isLoading } = useObject({
    api: '/api/let-ai-decide',
    schema: ProjectStructureSchema,
    onFinish: ({ object, error }) => {
      if (error) {
        console.error("Schema validation error:", error);
      }
      console.log("Project structure generated successfully:", object);
    }
  });

  const handleSubmit = () => {
    console.log("Submitting project idea:", projectIdea);
    submit(projectIdea);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content */}

      {/* Show form when no object is generated or when loading */}
      {(!object || isLoading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl"
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
                    className="min-h-32 resize-none text-base" disabled={isLoading}
                  />
                </div>
                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={!projectIdea.trim() || isLoading}
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                  >
                    {isLoading ? (
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
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Footer Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-center text-sm text-muted-foreground mt-6"
            >
              ✨ Powered by AI technology for intelligent project planning
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Show results when object is generated */}
      {object && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <div className="mb-6 text-center">
            <Button
              onClick={() => {
                // Reset the form to generate a new project
                setProjectIdea("");
                // The object will be cleared automatically by useObject
              }}
              variant="outline"
              className="mb-4"
            >
              Generate New Project
            </Button>
          </div>
          <ProjectResult
            projectName={object?.projectName}
            description={object?.description}
            tagline={object?.tagline}
            category={object?.category}
            projectMetadata={object?.projectMetadata}
            techStack={object?.techStack}
            architecture={object?.architecture}
            developmentPhases={object?.developmentPhases}
            projectStructure={object?.projectStructure}
            recommendations={object?.recommendations}
            security={object?.security}
            testing={object?.testing}
            learningResources={object?.learningResources}
            roadmap={object?.roadmap}
          />
        </motion.div>
      )}
    </main>
  );
}
