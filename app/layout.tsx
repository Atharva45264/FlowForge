import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "@excalidraw/excalidraw/index.css";
import "highlight.js/styles/github-dark.css";

import type { Metadata } from "next";

import {
  AppLiveblocksProvider,
} from "@/components/providers/liveblocks-provider";

import {
  QueryProvider,
} from "@/components/providers/query-provider";

import {
  ThemeProvider,
} from "@/components/providers/theme-provider";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FlowForge",
  description:
    "A cozy AI workspace for notes, tasks, pages, and whiteboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <QueryProvider>
              <AppLiveblocksProvider>
                {children}
              </AppLiveblocksProvider>

              <Toaster
                richColors
                position="bottom-right"
              />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}