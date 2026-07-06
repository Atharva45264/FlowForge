export interface Whiteboard {
  _id: string;

  title: string;

  ownerId: string;

  collaborators: string[];

  excalidrawData: {
    elements: any[];
    appState: any;
    files: any;
  };

  thumbnail: string;

  favorite: boolean;

  archived: boolean;

  createdAt: string;

  updatedAt: string;
}