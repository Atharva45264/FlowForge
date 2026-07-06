import mongoose, { Schema, models, model } from "mongoose";

const WhiteboardSchema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled Whiteboard",
    },

    ownerId: {
      type: String,
      required: true,
    },

    collaborators: {
      type: [String],
      default: [],
    },

    excalidrawData: {
      type: Object,
      default: {
        elements: [],
        appState: {},
        files: {},
      },
    },

    thumbnail: {
      type: String,
      default: "",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Whiteboard ||
  model("Whiteboard", WhiteboardSchema);