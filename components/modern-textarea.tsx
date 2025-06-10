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
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab' && (!value || value.trim() === '')) {
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
            {/* Glassmorphism container */}


            {/* Content */}
            <div className="relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl font-bold text-foreground mb-2 text-center"
                >
                    AI-Powered Project Planner
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
                >                        <Textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
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
            </div>

        </motion.div>
    );
}
