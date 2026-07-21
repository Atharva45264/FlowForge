import { Schema, model, models } from "mongoose";

const WorkspaceSettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    workspaceName: {
      type: String,
      default: "My Workspace",
    },

    defaultPage: {
      type: String,
      default: "dashboard",
    },

    collapseSidebar: {
      type: Boolean,
      default: false,
    },

    rememberSidebar: {
      type: Boolean,
      default: true,
    },

    autosaveNotes: {
      type: Boolean,
      default: true,
    },

    autosaveWhiteboard: {
      type: Boolean,
      default: true,
    },

    autosavePages: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.WorkspaceSettings ||
  model("WorkspaceSettings", WorkspaceSettingsSchema);