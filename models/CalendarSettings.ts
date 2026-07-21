import mongoose, { Schema, models, model } from "mongoose";

const CalendarSettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    googleConnected: {
      type: Boolean,
      default: false,
    },

    defaultReminder: {
      type: Number,
      default: 30,
    },

    defaultDuration: {
      type: Number,
      default: 60,
    },

    workingHours: {
      start: {
        type: String,
        default: "09:00",
      },

      end: {
        type: String,
        default: "18:00",
      },
    },

    timezone: {
      type: String,
      default: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  },
  {
    timestamps: true,
  }
);

export default models.CalendarSettings ||
  model("CalendarSettings", CalendarSettingsSchema);