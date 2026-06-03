"use client"

import {
  menuGroups,
  workspaceCards,
  upcomingItems,
} from "@/components/dashboard/dashboard-data"
import { Bot, CalendarDays, Sparkles } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Search, UsersRound } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"



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

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="space-y-6">
                <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/80 p-6 shadow-xl shadow-slate-950/20">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-sm font-medium text-violet-200">
                        Your calm command surface
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                        Notes, whiteboards, tasks, and AI context in one focused workspace.
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                        Keep strategy, daily work, and creative exploration close without
                        turning the interface into noise.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                      {[
                        ["Active spaces", "08"],
                        ["Open tasks", "24"],
                        ["AI drafts", "13"],
                      ].map(([label, value]) => (
                        <div key={label} className="min-w-24 rounded-lg bg-slate-800/70 p-3">
                          <p className="text-xl font-semibold text-white">{value}</p>
                          <p className="mt-1 text-[0.68rem] uppercase tracking-wide text-slate-500">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                  {workspaceCards.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span className={cn("h-2.5 w-2.5 rounded-full", card.accent)} />
                        <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[0.68rem] text-slate-400">
                          {card.meta}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {card.description}
                      </p>
                    </article>
                  ))}
                </section>

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
