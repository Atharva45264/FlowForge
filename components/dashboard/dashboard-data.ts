import {
  Bot,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Library,
  PenTool,
  Settings,
  WandSparkles,
} from "lucide-react"
import * as React from "react"

export type MenuItem = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
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
        href: "/",
        icon: LayoutDashboard,
        color: "text-indigo-400",
      },
      {
        label: "AI Assistant",
        href: "/assistant",
        icon: Bot,
        color: "text-purple-400",
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: CalendarDays,
        color: "text-blue-400",
      },
      {
        label: "Task / Kanban",
        href: "/kanban",
        icon: ClipboardList,
        color: "text-orange-300",
      },
    ],
  },
  {
    label: "Create",
    items: [
      {
        label: "Notes",
        href: "/notes",
        icon: FileText,
        color: "text-emerald-400",
      },
      {
        label: "Whiteboard",
        href: "/whiteboard",
        icon: PenTool,
        color: "text-pink-400",
      },
      {
        label: "Pages / Spaces",
        href: "/spaces",
        icon: Library,
        color: "text-cyan-300",
      },
      {
        label: "AI Template Builder",
        href: "/templates",
        icon: WandSparkles,
        color: "text-violet-300",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        color: "text-slate-400",
      },
    ],
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
