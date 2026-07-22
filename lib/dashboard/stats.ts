import {Note} from "@/models/Note";
import Page from "@/models/Page";
import Whiteboard from "@/models/Whiteboard";
import Chat from "@/models/Chat";
import ArchitectProject from "@/models/ArchitectProject";
import CalendarEvent from "@/models/CalendarEvent";

export async function getDashboardStats(
  userId: string,
  todayStart: Date,
  todayEnd: Date
) {
  const [
    notes,
    pages,
    boards,
    chats,
    architectProjects,
    favoritePages,
    archivedPages,
    eventsToday,
  ] = await Promise.all([
    Note.countDocuments({ userId }),

    Page.countDocuments({
      userId,
      archived: false,
    }),

    Whiteboard.countDocuments({ userId }),

    Chat.countDocuments({ userId }),

    ArchitectProject.countDocuments({ userId }),

    Page.countDocuments({
      userId,
      favorite: true,
      archived: false,
    }),

    Page.countDocuments({
      userId,
      archived: true,
    }),

    CalendarEvent.countDocuments({
      userId,

      start: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    }),
  ]);

  return {
    notes,
    pages,
    boards,
    chats,
    architectProjects,
    favoritePages,
    archivedPages,
    eventsToday,
  };
}