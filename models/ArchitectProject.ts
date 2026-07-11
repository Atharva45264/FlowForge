import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const ArchitectProjectSchema =
  new Schema(
    {
      userId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        default: "Untitled Architecture",
      },

      prompt: {
        type: String,
        default: "",
      },

      mermaid: {
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

export default
  models.ArchitectProject ||
  model(
    "ArchitectProject",
    ArchitectProjectSchema
  );