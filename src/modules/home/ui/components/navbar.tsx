"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  const isScrolled = useScroll();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled &&
          "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
      )}
    >
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
            <div className="relative p-2 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-zinc-200/40 dark:border-zinc-700/40 group-hover:border-zinc-300/60 dark:group-hover:border-zinc-600/60 transition-all duration-300 group-hover:shadow-lg">
              <Logo width={32} height={32} />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-300">
            Lunaris
          </span>
        </Link>

        <SignedOut>
          <div className="flex items-center gap-3">
            <SignUpButton>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border-zinc-200/60 dark:border-zinc-700/60 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-300"
              >
                Sign up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="sm"
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="relative">
            <div className="p-1 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-zinc-200/40 dark:border-zinc-700/40 shadow-sm">
              <UserControl showName />
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
