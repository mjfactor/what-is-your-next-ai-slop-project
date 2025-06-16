"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'
const UserProfile = () => {
    const { data: session, isPending } = useSession();
    const Router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        Router.push('/auth'); // Redirect to auth page   after sign out

    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Don't render anything if no session and not loading
    if (!session?.user && !isPending) {
        return null;
    }

    // Loading State
    if (isPending) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="fixed top-4 right-4 z-50"
            >
                <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
                        <div className="flex flex-col space-y-1">
                            <div className="h-3 w-20 animate-pulse rounded bg-muted"></div>
                            <div className="h-2 w-16 animate-pulse rounded bg-muted"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // User Profile with Dropdown
    if (session?.user) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="fixed top-4 right-4 z-50"
            >
                <div className="backdrop-blur-xl bg-background/80 border border-border/50 rounded-xl p-4 shadow-lg">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-auto px-3 rounded-lg gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={session.user.image || undefined}
                                        alt={session.user.name || session.user.email || 'User'}
                                    />
                                    <AvatarFallback className="text-xs">
                                        {getInitials(session.user.name || session.user.email || 'User')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start text-left">
                                    <p className="text-sm font-medium leading-none">
                                        {session.user.name || session.user.email || 'User'}
                                    </p>
                                    {session.user.email && session.user.name && (
                                        <p className="text-xs text-muted-foreground leading-none mt-1">
                                            {session.user.email}
                                        </p>
                                    )}
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {session.user.name || session.user.email || 'User'}
                                    </p>
                                    {session.user.email && (
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    )}
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                onClick={handleSignOut}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>
        );
    }

    return null;
};

export default UserProfile;
