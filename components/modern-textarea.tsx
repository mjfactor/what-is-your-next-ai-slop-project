"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

interface ModernTextareaProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    letAIDecide?: boolean;
    onToggleAIDecide?: (value: boolean) => void;
}

export function ModernTextarea({
    placeholder = "Start typing your thoughts...",
    className,
    value,
    onChange,
    letAIDecide = true,
    onToggleAIDecide
}: ModernTextareaProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [projectStructure, setProjectStructure] = useState(null);

    // Keep useChat available for potential future chat functionality
    const { messages, input, handleInputChange, handleSubmit } = useChat();

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
                    console.log('✅ Route.ts Response Success:', data);
                    console.log('📊 Project Structure:', data.projectStructure);
                    console.log('🔧 Tech Stack:', data.projectStructure?.techStack);
                    console.log('📈 Nodes:', data.projectStructure?.nodes);
                    console.log('🔗 Edges:', data.projectStructure?.edges);
                    console.log('💡 Recommendations:', data.projectStructure?.recommendations);
                    console.log('⏱️ Timeline:', data.projectStructure?.estimatedTimeline);

                    setProjectStructure(data.projectStructure);
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            if (value && value.trim()) {
                handleProjectSubmission(value);
            }
        } else if (e.key === 'Tab' && (!value || value.trim() === '')) {
            e.preventDefault();
            if (onChange) {
                // Create a synthetic event to mimic the onChange behavior
                const syntheticEvent = {
                    target: { value: placeholder },
                    currentTarget: e.currentTarget
                } as React.ChangeEvent<HTMLTextAreaElement>;
                onChange(syntheticEvent);
            }
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
            }}
            className="relative w-full max-w-2xl mx-auto"
        >

            {/* Content */}
            <div className="relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl font-bold text-foreground mb-2 text-center"
                >
                    AI-Powered Project Planner
                </motion.h1>                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-muted-foreground text-center mb-8"
                >
                    Design and generate complete project structures with AI
                    <br />
                    <span className="text-sm opacity-75">
                        Press Ctrl+Enter to submit your project idea
                    </span>
                </motion.p>

                {/* AI Decision Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex items-center justify-center gap-3 mb-6"
                >
                    <span className={cn(
                        "text-sm font-medium transition-colors",
                        letAIDecide ? "text-muted-foreground" : "text-foreground"
                    )}>
                        Manual Selection
                    </span>
                    <Switch
                        checked={letAIDecide}
                        onCheckedChange={onToggleAIDecide}
                        className="data-[state=checked]:bg-primary"
                    />
                    <span className={cn(
                        "text-sm font-medium transition-colors",
                        letAIDecide ? "text-foreground" : "text-muted-foreground"
                    )}>
                        Let AI Decide
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                >                    <Textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className={cn(
                            "min-h-[200px] text-lg resize-none",
                            "bg-background/50 backdrop-blur-sm",
                            "border-border/50 focus-visible:border-primary/50",
                            "transition-all duration-300",
                            "placeholder:text-muted-foreground/60",
                            isLoading && "opacity-50 cursor-not-allowed",
                            className
                        )}
                    />

                    {/* Loading indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-md"
                        >
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                <span className="text-sm">Generating project structure...</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Submit button */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        onClick={() => value && value.trim() && handleProjectSubmission(value)}
                        disabled={isLoading || !value?.trim()}
                        className={cn(
                            "absolute bottom-4 right-4 px-4 py-2 rounded-md",
                            "bg-primary text-primary-foreground text-sm font-medium",
                            "transition-all duration-200",
                            "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            isLoading && "animate-pulse"
                        )}
                    >
                        {isLoading ? 'Generating...' : 'Generate Project'}
                    </motion.button>                </motion.div>
            </div>
        </motion.div>
    );
}
