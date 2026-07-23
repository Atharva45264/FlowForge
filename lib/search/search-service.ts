import connectDB from "@/lib/mongodb";

import { Note } from "@/models/Note";
import Page from "@/models/Page";
import Whiteboard from "@/models/Whiteboard";
import CalendarEvent from "@/models/CalendarEvent";
import Chat from "@/models/Chat";
import ArchitectProject from "@/models/ArchitectProject";

import { SearchResult } from "./types";

export async function searchWorkspace(
  ownerId: string,
  query: string
): Promise<SearchResult[]> {
  await connectDB();

  const regex = new RegExp(query, "i");

  const [
    notes,
    pages,
    whiteboards,
    events,
    chats,
    architectProjects,
  ] = await Promise.all([
    Note.find({
      ownerId,
      $or: [{ title: regex }, { content: regex }],
    }).lean(),

    Page.find({
      userId: ownerId,
      archived: false,
      $or: [{ title: regex }, { content: regex }],
    }).lean(),

    Whiteboard.find({
      ownerId,
      archived: false,
      title: regex,
    }).lean(),

    CalendarEvent.find({
      ownerId,
      $or: [{ title: regex }, { description: regex }],
    }).lean(),

    Chat.find({
      userId: ownerId,
      $or: [
        { title: regex },
        {
          messages: {
            $elemMatch: {
              content: regex,
            },
          },
        },
      ],
    }).lean(),

    ArchitectProject.find({
      userId: ownerId,
      archived: false,
      $or: [{ title: regex }, { prompt: regex }],
    }).lean(),
  ]);

  const results: SearchResult[] = [];

  // Notes
  notes.forEach((note: any) => {
    results.push({
      id: note._id.toString(),
      title: note.title,
      description: note.content?.slice(0, 120),
      type: "note",
      href: `/notes/${note._id}`,
      updatedAt: note.updatedAt,
    });
  });

  // Pages
  pages.forEach((page: any) => {
    results.push({
      id: page._id.toString(),
      title: page.title,
      description: page.content
        ?.replace(/<[^>]+>/g, "")
        .slice(0, 120),
      type: "page",
      href: `/pages/${page._id}`,
      updatedAt: page.updatedAt,
    });
  });

  // Whiteboards
  whiteboards.forEach((board: any) => {
    results.push({
      id: board._id.toString(),
      title: board.title,
      description: "Whiteboard",
      type: "whiteboard",
      href: `/whiteboards/${board._id}`,
      updatedAt: board.updatedAt,
    });
  });

  // Calendar
  events.forEach((event: any) => {
    results.push({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      type: "calendar",
      href: "/calendar",
      updatedAt: event.updatedAt,
    });
  });

  // AI Chats
  chats.forEach((chat: any) => {
    results.push({
      id: chat._id.toString(),
      title: chat.title,
      description:
        chat.messages?.[0]?.content?.slice(0, 120) ??
        "AI Conversation",
      type: "chat",
      href: `/assistant/${chat._id}`,
      updatedAt: chat.updatedAt,
    });
  });

  // Architect
  architectProjects.forEach((project: any) => {
    results.push({
      id: project._id.toString(),
      title: project.title,
      description: project.prompt?.slice(0, 120),
      type: "architect",
      href: `/architect/${project._id}`,
      updatedAt: project.updatedAt,
    });
  });

  return results.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  );
}