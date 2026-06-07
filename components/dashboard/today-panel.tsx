import { CalendarDays } from "lucide-react"

import { upcomingItems } from "@/components/dashboard/dashboard-data"
import { cn } from "@/lib/utils"

export function TodayPanel() {
  return (
    <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">Today</h2>
                    <CalendarDays className="h-4 w-4 text-blue-300" aria-hidden="true" />
                  </div>
                  <div className="space-y-3">
                    {upcomingItems.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-900/40 p-3"
                      >
                        <span className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-200">{item.title}</p>
                          <p className="text-[0.7rem] text-slate-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

  )
}