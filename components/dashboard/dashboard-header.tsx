import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-700/70 bg-slate-950/30 px-6 backdrop-blur">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-300">
                    Dashboard
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    Welcome back to FlowForge
                  </h1>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-xl border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                    aria-label="Previous workspace"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl border border-indigo-400/20 bg-indigo-500/15 px-4 text-sm text-indigo-100 hover:bg-indigo-500/20 hover:text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                    New canvas
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-xl border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                    aria-label="Next workspace"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </header>
  )
}