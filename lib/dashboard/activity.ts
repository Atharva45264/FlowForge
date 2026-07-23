import {Note} from "@/models/Note";
import Page from "@/models/Page";
import Whiteboard from "@/models/Whiteboard";
import CalendarEvent from "@/models/CalendarEvent";
import Chat from "@/models/Chat";
import ArchitectProject from "@/models/ArchitectProject";

import { DashboardActivity } from "./types";

export async function getRecentActivity(
  userId: string
): Promise<DashboardActivity[]> {
  const [
    notes,
    pages,
    boards,
    events,
    chats,
    projects,
  ] = await Promise.all([
    Note.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    Page.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    Whiteboard.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    CalendarEvent.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    Chat.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    ArchitectProject.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const activity = [
    ...notes.map((note: any) => ({
      type: "note",
      title: note.title || "Untitled Note",
      updatedAt: note.updatedAt,
      href: `/notes/${note._id}`,
    })),

    ...pages.map((page: any) => ({
      type: "page",
      title: page.title || "Untitled Page",
      updatedAt: page.updatedAt,
      href: `/pages/${page._id}`,
    })),

    ...boards.map((board: any) => ({
      type: "board",
      title: board.title || "Untitled Whiteboard",
      updatedAt: board.updatedAt,
      href: `/whiteboard/${board._id}`,
    })),

    ...events.map((event: any) => ({
      type: "calendar",
      title: event.title || "Calendar Event",
      updatedAt: event.updatedAt,
      href: "/calendar",
    })),

    ...chats.map((chat: any) => ({
      type: "chat",
      title: chat.title || "AI Conversation",
      updatedAt: chat.updatedAt,
      href: "/assistant",
    })),

    ...projects.map((project: any) => ({
      type: "architect",
      title: project.name || "Workflow",
      updatedAt: project.updatedAt,
      href: `/architect/${project._id}`,
    })),
  ];

  return activity
  .sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  )
  .slice(0, 10) as DashboardActivity[];
}