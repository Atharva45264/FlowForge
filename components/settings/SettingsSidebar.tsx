"use client";

import {
  User,
  Palette,
  Bot,
  CalendarDays,
  Bell,
  FolderOpen,
  Shield,
  Info,
} from "lucide-react";

import { SettingsSection } from "./SettingsLayout";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onChange: (section: SettingsSection) => void;
}

const items: {
  id: SettingsSection;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "ai",
    label: "AI Settings",
    icon: Bot,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: FolderOpen,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "about",
    label: "About",
    icon: Info,
  },
];

export default function SettingsSidebar({
  activeSection,
  onChange,
}: SettingsSidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r bg-muted/30 md:flex md:flex-col">
      <div className="border-b px-6 py-6">
        <h2 className="text-xl font-bold">Settings</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your FlowForge workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t p-5">
        <div className="rounded-xl bg-muted p-4">
          <p className="text-sm font-medium">
            FlowForge
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
}