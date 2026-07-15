import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICalendarEvent extends Document {
  ownerId: string;

  title: string;

  description?: string;

  date: string;

  startTime: string;

  endTime: string;

  color: string;

  createdBy: "manual" | "ai";

  createdAt: Date;

  updatedAt: Date;
}

const CalendarEventSchema = new Schema<ICalendarEvent>(
  {
    ownerId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "#3b82f6",
    },

    createdBy: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual",
    },
  },
  {
    timestamps: true,
  }
);

export default models.CalendarEvent ||
  model<ICalendarEvent>(
    "CalendarEvent",
    CalendarEventSchema
  );