import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  SunMoonIcon,
  MonitorIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Props {
  projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const { setTheme, theme } = useTheme();

  const getThemeIcon = (themeValue: string) => {
    switch (themeValue) {
      case "light":
        return <SunIcon className="size-4" />;
      case "dark":
        return <MoonIcon className="size-4" />;
      case "system":
        return <MonitorIcon className="size-4" />;
      default:
        return <SunMoonIcon className="size-4" />;
    }
  };

  return (
    <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="mr-3 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Logo width={20} height={20} />
            </div>

            <div className="flex-1 text-left">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Click to manage
              </div>
            </div>

            <ChevronDownIcon className="size-4 text-zinc-400" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg"
        >
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-3 p-3">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <HomeIcon className="size-4 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <div className="font-medium">Dashboard</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Return to home
                </div>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-3 p-3">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                {getThemeIcon(theme || "system")}
              </div>
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                  {theme || "system"}
                </div>
              </div>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light" className="gap-3">
                    <SunIcon className="size-4" />
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="gap-3">
                    <MoonIcon className="size-4" />
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="gap-3">
                    <MonitorIcon className="size-4" />
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
