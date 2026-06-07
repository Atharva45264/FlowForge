"use client"

import React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HeroSection } from "@/components/dashboard/hero-section"
import { WorkspaceCards } from "@/components/dashboard/workspace-cards"
import { KanbanPreview } from "@/components/dashboard/kanban-preview"
import { TodayPanel } from "@/components/dashboard/today-panel"
import { AIAssistantPanel } from "@/components/dashboard/ai-assistant-panel"

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
                <KanbanPreview />
              </div>

              <aside className="space-y-6">
                <TodayPanel />
                <AIAssistantPanel />
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
