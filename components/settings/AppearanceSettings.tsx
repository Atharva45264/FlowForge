"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, Laptop, Moon, Sun } from "lucide-react";

const themes = [
  {
    id: "light",
    title: "Light",
    description: "Bright and clean workspace",
    icon: Sun,
  },
  {
    id: "dark",
    title: "Dark",
    description: "Cozy and focused experience",
    icon: Moon,
  },
  {
    id: "system",
    title: "System",
    description: "Automatically follows your device",
    icon: Laptop,
  },
];

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Appearance</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Customize the look and feel of FlowForge.
        </p>
      </div>

      {/* Theme Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {themes.map((item) => {
          const Icon = item.icon;
          const active = theme === item.id;

          return (
            <Card
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02]
              ${
                active
                  ? "border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  {active && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Preview */}
      <Card className="overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-semibold">
            Theme Preview
          </h3>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-xl border bg-card p-5">
            <h4 className="font-semibold">
              Dashboard Widget
            </h4>

            <p className="mt-2 text-sm text-muted-foreground">
              This is how cards and widgets will appear
              throughout FlowForge.
            </p>

            <button className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90">
              Primary Action
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}