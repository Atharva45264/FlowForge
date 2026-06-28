export interface Note {
  _id?: string;

  title: string;

  content: string;

  ownerId: string;

  isFavorite: boolean;

  createdAt: Date;

  updatedAt: Date;
}