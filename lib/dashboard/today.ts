import CalendarEvent from "@/models/CalendarEvent";

export async function getTodayEvents(
  userId: string,
  start: Date,
  end: Date
) {
  return CalendarEvent.find({
    userId,

    start: {
      $gte: start,
      $lte: end,
    },
  })
    .sort({
      start: 1,
    })
    .lean();
}