"use client";

import { useMemo, useState } from "react";

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
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import useChats from "@/hooks/use-chats";

interface AISidebarProps {
  selectedConversation: string | null;
  onSelectConversation: (
    id: string |null
  ) => void;
}

const quickActions = [
  {
    title: "Summarize",
    icon: FileText,
    description: "Summarize long text",
  },
  {
    title: "Write Email",
    icon: Mail,
    description: "Generate professional emails",
  },
  {
    title: "Explain Code",
    icon: Code2,
    description: "Understand code instantly",
  },
  {
    title: "Voice Assistant",
    icon: Mic,
    description: "Talk naturally",
  },
  {
    title: "PDF Chat",
    icon: FileText,
    description: "Ask questions from PDFs",
  },
  {
    title: "Vision AI",
    icon: ImageIcon,
    description: "Analyze images",
  },
  {
    title: "Calendar",
    icon: CalendarPlus,
    description: "Schedule events",
  },
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

  const [title, setTitle] =
    useState("");

  const [search, setSearch] =
    useState("");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, chats]);

  function formatDate(date: string) {
    const d = new Date(date);

    const now = new Date();

    const diff =
      now.getTime() - d.getTime();

    const mins =
      Math.floor(diff / 60000);

    const hrs =
      Math.floor(mins / 60);

    const days =
      Math.floor(hrs / 24);

    if (mins < 1)
      return "Just now";

    if (mins < 60)
      return `${mins} min ago`;

    if (hrs < 24)
      return `${hrs} hr ago`;

    if (days === 1)
      return "Yesterday";

    if (days < 7)
      return `${days} days ago`;

    return d.toLocaleDateString();
  }

  async function handleRename(
    chatId: string
  ) {
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

  async function handleDelete(
    chatId: string
  ) {
    const ok =
      window.confirm(
        "Delete this conversation?"
      );

    if (!ok) return;

    await deleteChat(chatId);

    if (
      selectedConversation ===
      chatId
    ) {
      onSelectConversation(null);
    }
  }

  return (
    <aside className="flex h-full flex-col bg-background">

      {/* HEADER */}

      <div className="border-b bg-background/90 px-5 py-6 backdrop-blur">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-2xl bg-primary/10 p-3">

            <Bot className="h-6 w-6 text-primary" />

          </div>

          <div>

            <h2 className="text-lg font-semibold tracking-tight">
              FlowForge AI
            </h2>

            <p className="text-xs text-muted-foreground">
              Intelligent Workspace
            </p>

          </div>

        </div>

        <Button
          onClick={() =>
            onSelectConversation(null)
          }
          className="h-11 w-full gap-2 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <MessageSquarePlus className="h-4 w-4" />

          New Conversation

        </Button>

      </div>

      {/* SEARCH */}

      <div className="px-5 pt-5">

        <div className="relative">

          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search conversations..."
            className="h-11 w-full rounded-xl border bg-muted/40 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-background"
          />

        </div>

      </div>

      {/* CHAT LIST */}

      <div className="flex-1 overflow-y-auto px-5 py-5">

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">

          Recent Conversations

        </p>

        {loading ? (

          <p className="text-sm text-muted-foreground">

            Loading...

          </p>

        ) : filteredChats.length === 0 ? (

          <div className="mt-10 flex flex-col items-center text-center">

            <div className="rounded-full bg-primary/10 p-5">

              <Bot className="h-7 w-7 text-primary"/>

            </div>

            <h3 className="mt-4 font-semibold">

              No conversations

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Start chatting with FlowForge AI.

            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {filteredChats.map((chat) => (

              <div
                key={chat._id}
                className={`group rounded-2xl border transition-all duration-200 hover:shadow-sm hover:scale-[1.01]
                ${
                  selectedConversation ===
                  chat._id
                    ? "border-primary/40 bg-primary/5 shadow-sm"
                    : "border-transparent hover:bg-muted/40"
                }`}
              >

                <div className="flex items-start gap-3 p-3">

                  <div
                    className="mt-1 rounded-lg bg-primary/10 p-2"
                  >
                    <Sparkles className="h-4 w-4 text-primary"/>
                  </div>

                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() =>
                      onSelectConversation(
                        chat._id
                      )
                    }
                  >

                    {editingChat ===
                    chat._id ? (

                      <input
                        autoFocus
                        value={title}
                        onChange={(e)=>
                          setTitle(
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border bg-background px-2 py-1 text-sm outline-none"
                      />

                    ) : (

                      <>

                        <p className="truncate font-medium">

                          {chat.title}

                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">

                          {formatDate(
                            chat.updatedAt
                          )}

                        </p>

                      </>

                    )}

                  </div>

                  {editingChat ===
                  chat._id ? (

                    <div className="flex">

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={()=>
                          handleRename(
                            chat._id
                          )
                        }
                      >

                        <Check className="h-4 w-4 text-green-500"/>

                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={()=>
                          setEditingChat(
                            null
                          )
                        }
                      >

                        <X className="h-4 w-4"/>

                      </Button>

                    </div>

                  ) : (

                    <div className="flex opacity-0 transition-opacity duration-200 group-hover:opacity-100">

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={()=>{
                          setEditingChat(
                            chat._id
                          );

                          setTitle(
                            chat.title
                          );
                        }}
                      >

                        <Pencil className="h-4 w-4"/>

                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={()=>
                          handleDelete(
                            chat._id
                          )
                        }
                      >

                        <Trash2 className="h-4 w-4 text-red-500"/>

                      </Button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* FOOTER */}

      <div className="border-t bg-background/80 p-5 backdrop-blur">

        <div className="rounded-3xl border bg-linear-to-br from-primary/10 via-background to-background p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">

              <Bot className="h-6 w-6" />

            </div>

            <div className="min-w-0 flex-1">

              <h3 className="truncate text-sm font-semibold">

                FlowForge AI

              </h3>

              <p className="text-xs text-muted-foreground">

                Gemini 2.5 Flash

              </p>

            </div>

          </div>

          <div className="mt-5 rounded-2xl border bg-background/70 p-3">

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium">

                AI Status

              </span>

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

                <span className="text-xs font-medium text-green-600">

                  Online

                </span>

              </div>

            </div>

          </div>

          <div className="mt-4 space-y-2 text-xs text-muted-foreground">

            <div className="flex items-center justify-between">

              <span>Model</span>

              <span className="font-medium">
                Gemini Flash
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span>Features</span>

              <span className="font-medium">
                Voice • Vision • PDF
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span>Calendar</span>

              <span className="font-medium text-green-600">

                Connected

              </span>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}