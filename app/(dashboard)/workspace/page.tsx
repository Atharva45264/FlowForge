"use client";

import { motion } from "framer-motion";

import DashboardHero from "@/components/dashboard/dashboard-hero";
import AICommandCenter from "@/components/dashboard/ai-command-center";
import TodayFocus from "@/components/dashboard/today-focus";
import WorkspaceGrid from "@/components/dashboard/workspace-grid";
import InsightsPanel from "@/components/dashboard/insights-panel";
import QuickLaunch from "@/components/dashboard/quick-launch";
import ActivityFeed from "@/components/dashboard/activity-feed";

import {
  dashboardContainer,
  dashboardItem,
} from "@/lib/animations/dashboard";

export default function WorkspacePage() {
  return (
    <motion.div
      variants={dashboardContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-8 pb-12"
    >
      <motion.div variants={dashboardItem}>
        <DashboardHero />
      </motion.div>

      <motion.div
        variants={dashboardItem}
        className="grid gap-8 xl:grid-cols-[1.8fr_1fr]"
      >
        <AICommandCenter />
        <TodayFocus />
      </motion.div>

      <motion.div variants={dashboardItem}>
        <WorkspaceGrid />
      </motion.div>

      <motion.div variants={dashboardItem}>
        <InsightsPanel />
      </motion.div>

      <motion.div variants={dashboardItem}>
        <QuickLaunch />
      </motion.div>

      <motion.div variants={dashboardItem}>
        <ActivityFeed />
      </motion.div>
    </motion.div>
  );
}