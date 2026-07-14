"use client";

import { useState } from "react";
import {
  Bot,
  CalendarPlus,
  Check,
  Code2,
  FileText,
  ImageIcon,
  Mail,
  MessageSquarePlus,
  Mic,
  Pencil,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import useChats from "@/hooks/use-chats";

interface AISidebarProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string | null) => void;
}

const quickActions = [
  { title: "Summarize", icon: FileText },
  { title: "Write Email", icon: Mail },
  { title: "Explain Code", icon: Code2 },
  { title: "Voice Assistant", icon: Mic },
  { title: "PDF Chat", icon: FileText },
  { title: "Image Understanding", icon: ImageIcon },
  { title: "Schedule Event", icon: CalendarPlus },
];

export default function AISidebar({
  selectedConversation,
  onSelectConversation,
}: AISidebarProps) {
  const {
    chats,
    loading,
    renameChat,
    deleteChat,
  } = useChats();

  const [editingChat, setEditingChat] =
    useState<string | null>(null);

  const [title, setTitle] = useState("");

  async function handleRename(chatId: string) {
    if (!title.trim()) {
      setEditingChat(null);
      return;
    }

    await renameChat({
      chatId,
      title,
    });

    setEditingChat(null);
  }

  async function handleDelete(chatId: string) {
    const ok = window.confirm(
      "Delete this conversation?"
    );

    if (!ok) return;

    await deleteChat(chatId);

    if (selectedConversation === chatId) {
      onSelectConversation(null);
    }
  }

  return (
    <aside className="flex h-full flex-col">

      {/* Header */}

      <div className="border-b p-5">

        <Button
          className="w-full gap-2"
          onClick={() =>
            onSelectConversation(null)
          }
        >
          <MessageSquarePlus className="h-4 w-4" />

          New Chat

        </Button>

      </div>

      {/* Chats */}

      <div className="flex-1 overflow-y-auto px-5 pt-5">

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Chats
        </p>

        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        ) : chats.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No chats yet.
          </p>
        ) : (
          <div className="space-y-2">

            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`group rounded-lg border transition ${
                  selectedConversation ===
                  chat._id
                    ? "border-primary bg-muted"
                    : "border-transparent hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 p-2">

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      onSelectConversation(chat._id)
                    }
                  >
                    {editingChat ===
                    chat._id ? (
                      <input
                        autoFocus
                        value={title}
                        onChange={(e) =>
                          setTitle(
                            e.target.value
                          )
                        }
                        className="w-full rounded border bg-background px-2 py-1 text-sm outline-none"
                      />
                    ) : (
                      <>
                        <p className="truncate text-sm font-medium">
                          {chat.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            chat.updatedAt
                          ).toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>

                  {editingChat ===
                  chat._id ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRename(
                            chat._id
                          )
                        }
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setEditingChat(
                            null
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex opacity-0 transition-opacity group-hover:opacity-100">

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingChat(
                            chat._id
                          );
                          setTitle(
                            chat.title
                          );
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDelete(
                            chat._id
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>

                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
        )}

        {/* Quick Actions */}

        <div className="mt-8">

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </p>

          <div className="space-y-2">

            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </button>
              );
            })}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-5">

        <div className="rounded-xl border bg-muted/40 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-primary/10 p-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>

            <div>

              <p className="font-medium">
                Gemini 2.5 Flash
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-green-500">

                <Sparkles className="h-3 w-3" />

                Connected

              </div>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}