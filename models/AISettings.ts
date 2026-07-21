import mongoose, { Schema, models, model } from "mongoose";

const AISettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    model: {
      type: String,
      default: "gemini-2.5-flash",
    },

    temperature: {
      type: Number,
      default: 0.7,
    },

    responseLength: {
      type: String,
      enum: ["short", "medium", "long"],
      default: "medium",
    },

    voiceEnabled: {
      type: Boolean,
      default: true,
    },

    imageUnderstanding: {
      type: Boolean,
      default: true,
    },

    pdfChat: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.AISettings ||
  model("AISettings", AISettingsSchema);