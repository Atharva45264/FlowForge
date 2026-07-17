import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPage extends Document {
  userId: string;
  spaceId: mongoose.Types.ObjectId;

  title: string;
  icon: string;
  content: string;

  tags: string[];

  favorite: boolean;
  archived: boolean;

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

    icon: {
      type: String,
      default: "📄",
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
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;