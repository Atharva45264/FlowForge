import mongoose, { Schema, Document, Model } from "mongoose";

export type ChatRole = "user" | "assistant";

export interface IChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

export interface IChat extends Document {
  userId: string;
  title: string;
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    id: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const ChatSchema = new Schema<IChat>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    messages: {
      type: [ChatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IChat> =
  mongoose.models.Chat ||
  mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;