"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ModernTextareaProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ModernTextarea({
    placeholder = "Start typing your thoughts...",
    className,
    value,
    onChange
}: ModernTextareaProps) {
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
            {/* Glassmorphism container */}
            <div className="relative backdrop-blur-md bg-background/30 border border-border/50 rounded-2xl p-8 shadow-2xl">
                {/* Animated gradient border */}
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-sm"
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Content */}
                <div className="relative z-10">                    <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl font-bold text-foreground mb-2 text-center"
                >
                    AI-Powered Project Creator
                </motion.h1>                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-muted-foreground text-center mb-8"
                >
                        Design and generate complete project structures with AI
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                    >
                        <Textarea
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className={cn(
                                "min-h-[200px] text-lg resize-none",
                                "bg-background/50 backdrop-blur-sm",
                                "border-border/50 focus-visible:border-primary/50",
                                "transition-all duration-300",
                                "placeholder:text-muted-foreground/60",
                                className
                            )}
                        />
                    </motion.div>

                    {/* Floating action indicators */}
                  
                </div>
            </div>
        </motion.div>
    );
}
