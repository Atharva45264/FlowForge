import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import type { Metadata } from "next";
import {
  AppLiveblocksProvider,
} from "@/components/providers/liveblocks-provider";
import {
  QueryProvider,
} from "@/components/providers/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FlowForge",
  description: "A cozy AI workspace for notes, tasks, pages, and whiteboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          <AppLiveblocksProvider>
    {children}
  </AppLiveblocksProvider>
  <Toaster
  richColors
  position="bottom-right"
/>
        </body>
      </html>
      </QueryProvider>
    </ClerkProvider>
    
  );
}
