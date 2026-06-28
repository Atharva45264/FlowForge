import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled",
    },

    content: {
      type: String,
      default: "",
    },

    ownerId: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Note =
  models.Note ||
  model("Note", NoteSchema);