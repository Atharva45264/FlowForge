"use client";

import { useState } from "react";

import SettingsSidebar from "./SettingsSidebar";

import ProfileSettings from "./ProfileSettings";
import AppearanceSettings from "./AppearanceSettings";
import AISettings from "./AISettings";
import CalendarSettings from "./CalendarSettings";
import NotificationSettings from "./NotificationSettings";
import WorkspaceSettings from "./WorkspaceSettings";
import SecuritySettings from "./SecuritySettings";
import AboutSettings from "./AboutSettings";

export type SettingsSection =
  | "profile"
  | "appearance"
  | "ai"
  | "calendar"
  | "notifications"
  | "workspace"
  | "security"
  | "about";

export default function SettingsLayout() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      <SettingsSidebar
        activeSection={activeSection}
        onChange={setActiveSection}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">
          {activeSection === "profile" && <ProfileSettings />}

          {activeSection === "appearance" && (
            <AppearanceSettings />
          )}

          {activeSection === "ai" && (
            <AISettings />
          )}

          {activeSection === "calendar" && (
            <CalendarSettings />
          )}

          {activeSection === "notifications" && (
            <NotificationSettings />
          )}

          {activeSection === "workspace" && (
            <WorkspaceSettings />
          )}

          {activeSection === "security" && (
            <SecuritySettings />
          )}

          {activeSection === "about" && (
            <AboutSettings />
          )}
        </div>
      </main>
    </div>
  );
}