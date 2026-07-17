import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISpace extends Document {
  userId: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  archived: boolean;
  pageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SpaceSchema = new Schema<ISpace>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      type: String,
      default: "📁",
    },

    color: {
      type: String,
      default: "#7C3AED", // Purple
    },

    archived: {
      type: Boolean,
      default: false,
    },

    pageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Space: Model<ISpace> =
  mongoose.models.Space || mongoose.model<ISpace>("Space", SpaceSchema);

export default Space;