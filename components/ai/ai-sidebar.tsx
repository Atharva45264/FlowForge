"use client";

import {
  Bot,
  CalendarPlus,
  Code2,
  FileText,
  ImageIcon,
  Mail,
  Mic,
  MessageSquarePlus,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface AISidebarProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string | null) => void;
}

const conversations = [
  {
    id: "1",
    title: "Interview Preparation",
  },
  {
    id: "2",
    title: "Dashboard UI",
  },
  {
    id: "3",
    title: "Meeting Notes",
  },
];

const quickActions = [
  {
    title: "Summarize",
    icon: FileText,
  },
  {
    title: "Write Email",
    icon: Mail,
  },
  {
    title: "Explain Code",
    icon: Code2,
  },
  {
    title: "Voice Assistant",
    icon: Mic,
  },
  {
    title: "PDF Chat",
    icon: FileText,
  },
  {
    title: "Image Understanding",
    icon: ImageIcon,
  },
  {
    title: "Schedule Event",
    icon: CalendarPlus,
  },
];

export default function AISidebar({
  selectedConversation,
  onSelectConversation,
}: AISidebarProps) {
  return (
    <aside className="flex h-full flex-col">

      {/* Header */}

      <div className="border-b p-5">

        <Button className="w-full gap-2">

          <MessageSquarePlus className="h-4 w-4" />

          New Chat

        </Button>

      </div>

      {/* Recent */}

      <div className="flex-1 overflow-y-auto">

        <div className="px-5 pt-5">

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Chats
          </p>

          <div className="space-y-2">

            {conversations.map((chat) => (

              <button
                key={chat.id}
                onClick={() => onSelectConversation(chat.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${
                  selectedConversation === chat.id
                    ? "bg-muted"
                    : ""
                }`}
              >
                {chat.title}
              </button>

            ))}

          </div>

        </div>

        <div className="mt-8 px-5">

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