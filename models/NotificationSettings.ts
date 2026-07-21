import { Schema, model, models } from "mongoose";

const NotificationSettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    emailAI: {
      type: Boolean,
      default: true,
    },

    emailCalendar: {
      type: Boolean,
      default: true,
    },

    emailWorkspace: {
      type: Boolean,
      default: true,
    },

    weeklyReport: {
      type: Boolean,
      default: true,
    },

    desktopNotifications: {
      type: Boolean,
      default: true,
    },

    soundAlerts: {
      type: Boolean,
      default: true,
    },

    doNotDisturb: {
      start: {
        type: String,
        default: "22:00",
      },

      end: {
        type: String,
        default: "07:00",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.NotificationSettings ||
  model(
    "NotificationSettings",
    NotificationSettingsSchema
  );