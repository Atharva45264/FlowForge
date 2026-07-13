"use client";

import {
  CalendarPlus,
  Code2,
 FileText,
  ImageIcon,
  Mail,
  Mic,
} from "lucide-react";

const cards = [
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

export default function PromptCards() {
  return (
    <div className="mt-12 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <button
            key={card.title}
            className="rounded-xl border bg-card p-5 text-left transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <Icon className="mb-3 h-6 w-6 text-primary" />

            <p className="font-medium">
              {card.title}
            </p>
          </button>
        );
      })}

    </div>
  );
}