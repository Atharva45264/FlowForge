"use client"

import { HeroSection } from "@/components/dashboard/hero-section"
import { WorkspaceCards } from "@/components/dashboard/workspace-cards"
import { KanbanPreview } from "@/components/dashboard/kanban-preview"
import { TodayPanel } from "@/components/dashboard/today-panel"
import AILayout from "@/components/ai/ai-layout"

export default function DashboardPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        <HeroSection />
        <WorkspaceCards />
        <KanbanPreview />
      </div>

      <aside className="space-y-6">
        <TodayPanel />
        <AILayout />
      </aside>
    </div>
  )
}