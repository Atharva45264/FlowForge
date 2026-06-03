import {
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Library,
  PenTool,
  Search,
  Settings,
  Sparkles,
  UsersRound,
  WandSparkles,
} from "lucide-react"
import * as React from "react"

export type MenuItem = {
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  active?: boolean
}

export type MenuGroup = {
  label: string
  items: MenuItem[]
}

export const menuGroups: MenuGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        color: "text-indigo-400",
        active: true,
      },
      { label: "AI Assistant", icon: Bot, color: "text-purple-400" },
      { label: "Calendar", icon: CalendarDays, color: "text-blue-400" },
      { label: "Task / Kanban", icon: ClipboardList, color: "text-orange-300" },
    ],
  },
  {
    label: "Create",
    items: [
      { label: "Notes", icon: FileText, color: "text-emerald-400" },
      { label: "Whiteboard", icon: PenTool, color: "text-pink-400" },
      { label: "Pages / Spaces", icon: Library, color: "text-cyan-300" },
      { label: "AI Template Builder", icon: WandSparkles, color: "text-violet-300" },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: Settings, color: "text-slate-400" }],
  },
]

export const workspaceCards = [
  {
    title: "Daily Command Center",
    description: "Notes, meetings, and open decisions arranged for fast capture.",
    accent: "bg-indigo-400",
    meta: "12 items",
  },
  {
    title: "Product Sprint",
    description: "Kanban board, launch checklist, and whiteboard frames in one space.",
    accent: "bg-orange-300",
    meta: "6 boards",
  },
  {
    title: "AI Research Hub",
    description: "Reusable prompts, summaries, and template experiments.",
    accent: "bg-violet-300",
    meta: "18 docs",
  },
]

export const upcomingItems = [
  { time: "09:30", title: "Weekly planning", color: "bg-blue-400" },
  { time: "11:00", title: "Map onboarding flow", color: "bg-pink-400" },
  { time: "14:15", title: "Draft template pack", color: "bg-violet-300" },
]
