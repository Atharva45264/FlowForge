"use client";

import { ReactNode } from "react";
import { LiveblocksProvider } from "@liveblocks/react";

type Props = {
  children: ReactNode;
};

export function AppLiveblocksProvider({
  children,
}: Props) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
    >
      {children}
    </LiveblocksProvider>
  );
}