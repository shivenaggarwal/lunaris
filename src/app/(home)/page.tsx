import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
import { Logo } from "@/components/logo";

const Page = () => {
  return (
    <div className="relative flex flex-col max-w-6xl mx-auto w-full min-h-screen px-4">
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950" />

        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <section className="relative space-y-8 py-[8vh] 2xl:py-24">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

            <div className="relative p-4 bg-white/80 dark:bg-sidebar/80 backdrop-blur-sm rounded-2xl border-2 border-border/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <Logo width={64} height={64} />
            </div>

            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="space-y-6 text-center">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="inline-block">What can I</span>{" "}
            <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              help you
            </span>{" "}
            <span className="inline-block">build?</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning apps & websites by chatting with AI
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {[
              { icon: "⚡", text: "Instant" },
              { icon: "🎨", text: "Beautiful" },
              { icon: "📱", text: "Responsive" },
              { icon: "🚀", text: "Fast" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-sidebar/60 backdrop-blur-sm rounded-full border border-border/40 text-sm font-medium text-muted-foreground hover:bg-white dark:hover:bg-sidebar hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                <span className="text-base">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
          <ProjectForm />
        </div>
      </section>

      <div className="relative py-8 z-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-background px-6 py-2 rounded-full border border-border/40 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground font-medium">
              Your Projects
            </span>
          </div>
        </div>
      </div>

      <section className="pb-20 relative z-10">
        <ProjectList />
      </section>
    </div>
  );
};

export default Page;
