"use client";

import { useEffect } from "react";


import {
  FileText,
  Plus,
  Search,
  Star,
} from "lucide-react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createNote,
  getNotes,
} from "@/lib/notes";

import { useNotesStore } from "@/store/notes-store";

export function NotesSidebar() {
  const queryClient = useQueryClient();

  

  const {
    selectedNoteId,
    setSelectedNoteId,
    search,
    setSearch,
    isCreating,
    setIsCreating,
  } = useNotesStore();

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,

    onMutate: () => {
      setIsCreating(true);
    },

    onSuccess: (note) => {
      queryClient.setQueryData(
        ["notes"],
        (old: typeof notes = []) => [
          note,
          ...old,
        ]
      );

      setSelectedNoteId(note._id!);
    },

    onSettled: () => {
      setIsCreating(false);

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  useEffect(() => {
    if (
      notes.length > 0 &&
      (!selectedNoteId ||
        !notes.some(
          (n) => n._id === selectedNoteId
        ))
    ) {
      setSelectedNoteId(notes[0]._id!);
    }
  }, [
    notes,
    selectedNoteId,
    setSelectedNoteId,
  ]);

  const filteredNotes = notes.filter((note) =>
  note.title
    .toLowerCase()
    .includes(search.toLowerCase())
);

const favoriteNotes = filteredNotes.filter(
  (note) => note.isFavorite
);

const normalNotes = filteredNotes.filter(
  (note) => !note.isFavorite
);

  return (
    <aside
      className="
        flex
        w-72
        flex-col
        border-r
        border-slate-800
        bg-slate-950
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 p-6">

        <h2 className="text-2xl font-bold text-white">
          Notes
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Organize your ideas
        </p>

      </div>

      {/* Search */}

      <div className="p-4">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-3
            py-2
          "
        >
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search notes..."
            className="
              w-full
              bg-transparent
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
            "
          />

        </div>

      </div>

      {/* Section */}

      <div className="px-5">

        <div className="mb-3 flex items-center gap-2">

          <Star
            size={16}
            className="text-yellow-400"
          />

          <p className="text-sm font-medium text-slate-400">
            Notes
          </p>

        </div>

      </div>

      {/* Notes */}

      <div className="flex-1 overflow-y-auto px-3">

        {isLoading && (
          <div className="space-y-3">

            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="
                  h-12
                  animate-pulse
                  rounded-xl
                  bg-slate-800
                "
              />
            ))}

          </div>
        )}

        {error && (
          <div className="px-3 py-4 text-sm text-red-400">
            Failed to load notes.
          </div>
        )}

        {!isLoading &&
          !filteredNotes.length && (
            <div className="px-3 py-4 text-sm text-slate-500">
              No notes found.
            </div>
          )}

        {filteredNotes.map((note) => (

          <button
            key={note._id}
            onClick={() =>
              setSelectedNoteId(note._id!)
            }
            className={`
              mb-2
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              transition-all

              ${
                selectedNoteId === note._id
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-300 hover:bg-slate-800"
              }
            `}
          >

            <FileText
              size={18}
              className="shrink-0"
            />

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium">
                {note.title}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {new Date(
                  note.updatedAt
                ).toLocaleString()}
              </p>

            </div>

          </button>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <button
          disabled={isCreating}
          onClick={() =>
            createMutation.mutate()
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-500
            py-3
            font-medium
            text-white
            transition
            hover:bg-indigo-600
            disabled:opacity-50
          "
        >

          <Plus size={18} />

          {isCreating
            ? "Creating..."
            : "New Note"}

        </button>

      </div>

    </aside>
  );
}