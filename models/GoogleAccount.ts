import {
  Schema,
  model,
  models,
  Document,
} from "mongoose";

export interface IGoogleAccount extends Document {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiryDate: number;
}

const GoogleAccountSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    expiryDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default
  models.GoogleAccount ||
  model<IGoogleAccount>(
    "GoogleAccount",
    GoogleAccountSchema
  );