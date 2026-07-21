"use client";

import {
  Github,
  Globe,
  Mail,
  Rocket,
  Code2,
  Server,
  Database,
  BrainCircuit,
  ExternalLink,
  Heart,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutSettings() {
  const techStack = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "MongoDB",
    "Clerk Authentication",
    "Gemini AI",
    "React Query",
    "Liveblocks",
    "Excalidraw",
    "Tiptap",
    "Google Calendar API",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
          <Rocket size={34} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            FlowForge
          </h2>

          <p className="mt-2 text-muted-foreground">
            AI Powered Productivity Workspace
          </p>

          <div className="mt-4 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Version 1.0.0
          </div>
        </div>
      </div>

      {/* Description */}

      <Card className="p-6">
        <h3 className="font-semibold text-lg">
          About FlowForge
        </h3>

        <p className="mt-4 leading-7 text-muted-foreground">
          FlowForge is an all-in-one productivity platform designed to
          combine notes, AI assistance, collaborative whiteboards,
          calendars, Kanban boards, document editing, and workspaces into
          one seamless experience.
        </p>
      </Card>

      {/* Tech Stack */}

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Code2 className="text-primary" />
          <h3 className="font-semibold">
            Tech Stack
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <div
              key={tech}
              className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <BrainCircuit className="text-primary" />
          <h3 className="font-semibold">
            Features
          </h3>
        </div>

        <ul className="grid gap-3 md:grid-cols-2">
          <li>✅ AI Assistant</li>
          <li>✅ Voice Assistant</li>
          <li>✅ PDF Chat</li>
          <li>✅ Image Understanding</li>
          <li>✅ Notes</li>
          <li>✅ Whiteboard</li>
          <li>✅ Pages & Spaces</li>
          <li>✅ Calendar Sync</li>
          <li>✅ Kanban Board</li>
          <li>✅ Workspace Management</li>
        </ul>
      </Card>

      {/* Architecture */}

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Server className="text-primary" />
          <h3 className="font-semibold">
            Architecture
          </h3>
        </div>

        <div className="space-y-2 text-muted-foreground">
          <p>Frontend : Next.js + React + Tailwind CSS</p>
          <p>Backend : Next.js API Routes</p>
          <p>Database : MongoDB</p>
          <p>Authentication : Clerk</p>
          <p>AI : Google Gemini</p>
          <p>Realtime : Liveblocks</p>
        </div>
      </Card>

      {/* Links */}

      <Card className="p-6">
        <h3 className="mb-5 font-semibold">
          Useful Links
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://github.com/Atharva45264/FlowForge",
                "_blank"
              )
            }
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://ai.google.dev/",
                "_blank"
              )
            }
          >
            <BrainCircuit className="mr-2 h-4 w-4" />
            Gemini AI
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://nextjs.org/",
                "_blank"
              )
            }
          >
            <Globe className="mr-2 h-4 w-4" />
            Next.js
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://clerk.com/",
                "_blank"
              )
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Clerk
          </Button>
        </div>
      </Card>

      {/* Footer */}

      <Card className="p-6 text-center">
        <Database className="mx-auto mb-4 text-primary" />

        <p className="font-medium">
          Built with{" "}
          <Heart className="inline h-4 w-4 text-red-500" />{" "}
          using modern web technologies.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          © 2026 FlowForge. All rights reserved.
        </p>
      </Card>
    </div>
  );
}