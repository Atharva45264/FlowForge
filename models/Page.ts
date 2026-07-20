import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

export interface IPage extends Document {
  userId: string;
  spaceId: mongoose.Types.ObjectId;

  title: string;

  icon: string;
  emoji: string;
  cover: string;

  content: string;

  tags: string[];

  favorite: boolean;
  archived: boolean;

  // Sharing
  isPublic: boolean;
  shareId: string;

  lastOpenedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Legacy icon (used in sidebar)
    icon: {
      type: String,
      default: "📄",
    },

    // Large emoji shown inside the page
    emoji: {
      type: String,
      default: "📄",
    },

    // Gradient cover theme
    cover: {
      type: String,
      default: "purple",
    },

    content: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    archived: {
      type: Boolean,
      default: false,
    },

    // Public Sharing
    isPublic: {
      type: Boolean,
      default: false,
    },

    shareId: {
      type: String,
      unique: true,
      index: true,
      default: () => crypto.randomUUID(),
    },

    lastOpenedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Page: Model<IPage> =
  mongoose.models.Page ||
  mongoose.model<IPage>("Page", PageSchema);

export default Page;