import { cn } from "@/lib/utils"

export function KanbanPreview() {
  return (
    <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Kanban pulse</h2>
                      <p className="mt-1 text-xs text-slate-400">
                        A compact preview of the work moving through FlowForge.
                      </p>
                    </div>
                    <span className="rounded-full bg-orange-300/10 px-3 py-1 text-xs text-orange-200">
                      Sprint 04
                    </span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {["Backlog", "In progress", "Review"].map((column, index) => (
                      <div
                        key={column}
                        className="min-h-36 rounded-xl border border-slate-700/60 bg-slate-900/45 p-3"
                      >
                        <p className="mb-3 text-xs font-medium text-slate-300">{column}</p>
                        <div className="space-y-2">
                          {[0, 1].map((item) => (
                            <div
                              key={`${column}-${item}`}
                              className="rounded-lg border border-slate-700/70 bg-slate-800/70 p-3"
                            >
                              <div
                                className={cn(
                                  "mb-3 h-1.5 rounded-full",
                                  index === 0 && "bg-indigo-400/70",
                                  index === 1 && "bg-orange-300/70",
                                  index === 2 && "bg-emerald-400/70"
                                )}
                              />
                              <p className="text-xs text-slate-300">
                                {item === 0 ? "Refine workspace shell" : "Capture user flows"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
  )
}