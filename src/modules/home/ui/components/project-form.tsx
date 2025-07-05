"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PROJECT_TEMPLATES } from "@/modules/home/constants";
import { useClerk } from "@clerk/nextjs";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "value is required" })
    .max(10000, { message: "value is too long" }),
});

export const ProjectForm = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const clerk = useClerk();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        // todo invalidate usage stats
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);

        if (error.data?.code === "UNAUTHORIZED") {
          clerk.openSignIn();
        }

        // todo redired to pricing page if out of credits
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) => {
    form.setValue("value", value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const isPending = createProject.isPending;
  const isBtnDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
      <section className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-2xl blur-xl opacity-60 -z-10" />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "relative border-2 p-6 pt-2 rounded-2xl bg-white/80 dark:bg-sidebar/80 backdrop-blur-sm transition-all duration-300 shadow-lg",
              isFocused &&
                "border-primary/50 shadow-xl shadow-primary/10 bg-white dark:bg-sidebar",
              isPending && "animate-pulse"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <div className="relative">
                  {isFocused && (
                    <SparklesIcon className="absolute top-4 right-4 size-5 text-primary animate-bounce" />
                  )}

                  <TextareaAutosize
                    disabled={isPending}
                    {...field}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    minRows={3}
                    maxRows={8}
                    className={cn(
                      "pt-6 pb-4 pr-12 resize-none border-none w-full outline-none bg-transparent text-lg placeholder:text-muted-foreground/60 transition-all duration-200",
                      isFocused && "text-foreground"
                    )}
                    placeholder="Describe the app you want to build..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)(e);
                      }
                    }}
                  />
                </div>
              )}
            />

            <div className="flex gap-x-3 items-center justify-between pt-3 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border bg-muted/60 px-2 font-mono text-xs font-medium text-muted-foreground shadow-sm">
                  <span className="text-xs">⌘</span>Enter
                </kbd>
                <span>to create</span>
              </div>

              <Button
                disabled={isBtnDisabled}
                size="lg"
                className={cn(
                  "h-12 w-12 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
                  !isBtnDisabled &&
                    "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700",
                  isBtnDisabled &&
                    "bg-muted-foreground/60 border-muted cursor-not-allowed hover:scale-100"
                )}
              >
                {isPending ? (
                  <Loader2Icon className="size-5 animate-spin" />
                ) : (
                  <ArrowUpIcon className="size-5" />
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Or start with a template
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {PROJECT_TEMPLATES.map((template, index) => (
              <Button
                key={template.title}
                variant="outline"
                size="sm"
                className={cn(
                  "h-auto p-4 bg-white/60 dark:bg-sidebar/60 backdrop-blur-sm border-border/40 hover:bg-white dark:hover:bg-sidebar hover:border-primary/30 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group",
                  "flex flex-col items-center gap-2 text-center"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                onClick={() => onSelect(template.prompt)}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {template.emoji}
                </span>
                <span className="text-xs font-medium leading-tight">
                  {template.title
                    .replace("Build a ", "")
                    .replace("Build an ", "")}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </Form>
  );
};
