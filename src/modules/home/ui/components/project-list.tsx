"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Logo } from "@/components/logo";
import Link from "next/link";
import {
  FolderIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectList = () => {
  const trpc = useTRPC();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950/50 dark:via-blue-950/20 dark:to-purple-950/20 rounded-2xl blur-sm -z-10" />

      <div className="relative bg-white/90 dark:bg-sidebar/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-border/40 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <FolderIcon className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Recent Drifts
            </h2>
            <p className="text-sm text-muted-foreground">
              Your latest creations
            </p>
          </div>
        </div>

        {projects?.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full">
                <SparklesIcon className="size-8 text-muted-foreground/60" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-sm text-muted-foreground/80 max-w-sm mx-auto">
              Start building your first project by describing what you want to
              create above
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />

              <Button
                variant="outline"
                className={cn(
                  "relative font-normal h-auto justify-start w-full text-start p-0 border-border/40 bg-white/60 dark:bg-sidebar/60 backdrop-blur-sm hover:bg-white dark:hover:bg-sidebar transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:scale-[1.02] active:scale-[0.98] rounded-xl overflow-hidden"
                )}
                asChild
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="p-5 w-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm" />
                        <div className="relative p-2 bg-white dark:bg-sidebar rounded-full border-2 border-border/20 group-hover:border-primary/30 transition-colors duration-300">
                          <Logo width={50} height={50} />
                        </div>
                      </div>

                      <ArrowRightIcon className="size-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors duration-200">
                          {project.name}
                        </h3>
                        <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300 mt-1" />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="size-3 flex-shrink-0" />
                        <span className="truncate">
                          {formatDistanceToNow(project.updatedAt, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
