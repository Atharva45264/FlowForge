"use client"

import { upcomingItems } from "@/components/dashboard/dashboard-data"
import { Bot, CalendarDays, Sparkles } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HeroSection } from "@/components/dashboard/hero-section"
import { WorkspaceCards } from "@/components/dashboard/workspace-cards"


const sidebarSearchScript = `
document.addEventListener("input", function (event) {
  var input = event.target;
  if (!input || !input.classList || !input.classList.contains("flowforge-sidebar-search-input")) {
    return;
  }

  var query = input.value.trim().toLowerCase();
  var groups = document.querySelectorAll(".sidebar-menu-group");

  groups.forEach(function (group) {
    var visibleItems = 0;
    var items = group.querySelectorAll(".sidebar-menu-item");

    items.forEach(function (item) {
      var label = (item.getAttribute("data-label") || "").toLowerCase();
      var isVisible = label.indexOf(query) !== -1;

      item.hidden = !isVisible;
      if (isVisible) {
        visibleItems += 1;
      }
    });

    group.hidden = visibleItems === 0;
  });
});
`

export default function Home() {
  React.useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      ".flowforge-sidebar-search-input"
    )

    if (!input) {
      return
    }

    const filterMenu = () => {
      const query = input.value.trim().toLowerCase()
      const groups = document.querySelectorAll<HTMLElement>(".sidebar-menu-group")

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLButtonElement>(".sidebar-menu-item")
        let visibleItems = 0

        items.forEach((item) => {
          const label = item.dataset.label?.toLowerCase() ?? ""
          const isVisible = label.includes(query)

          item.hidden = !isVisible
          if (isVisible) {
            visibleItems += 1
          }
        })

        group.hidden = visibleItems === 0
      })
    }

    input.addEventListener("input", filterMenu)
    filterMenu()

    return () => input.removeEventListener("input", filterMenu)
  }, [])

  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-100">
      <script dangerouslySetInnerHTML={{ __html: sidebarSearchScript }} />
      <div className="dashboard-shell flex min-h-screen overflow-hidden">
        <Sidebar />
        <section className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="space-y-6">
                <HeroSection />
                <WorkspaceCards />
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
              </div>

              <aside className="space-y-6">
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

                <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10">
                  <div className="mb-4 flex items-center gap-2">
                    <Bot className="h-4 w-4 text-purple-300" aria-hidden="true" />
                    <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
                  </div>
                  <p className="text-xs leading-5 text-slate-400">
                    Ready to summarize notes, generate templates, and turn whiteboard
                    fragments into structured project pages.
                  </p>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-purple-300/20 bg-purple-400/10 px-4 py-2.5 text-xs font-medium text-purple-100 transition hover:bg-purple-400/15"
                  >
                    Open assistant
                  </button>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
