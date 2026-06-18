"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CollaborationDialog() {
  const [email, setEmail] =
    useState("");

  const members = [
    {
      id: "1",
      name: "Atharva",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="
            flex items-center gap-2
            rounded-lg border border-slate-700
            px-3 py-2 text-sm text-slate-300
            transition hover:bg-slate-800
          "
        >
          <Settings className="h-4 w-4" />
          Collaboration
        </button>
      </DialogTrigger>

      <DialogContent className="border-slate-700 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>
            Collaboration Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-300">
              Members
            </h3>

            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="
                    flex items-center gap-3
                    rounded-lg border border-slate-700
                    p-3
                  "
                >
                  <div
                    className="
                      flex h-8 w-8 items-center
                      justify-center rounded-full
                      bg-indigo-500 text-sm font-semibold
                    "
                  >
                    {member.name[0]}
                  </div>

                  <span>
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-300">
              Invite User
            </h3>

            <div className="flex gap-2">
              <input
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="user@email.com"
                className="
                  flex-1 rounded-lg
                  border border-slate-700
                  bg-slate-900 px-3 py-2
                  text-sm outline-none
                "
              />

              <button
                className="
                  rounded-lg bg-indigo-500
                  px-4 py-2 text-sm
                  font-medium hover:bg-indigo-600
                "
              >
                Invite
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-300">
              Board
            </h3>

            <div
              className="
                rounded-lg border
                border-slate-700 p-3
                text-sm text-slate-400
              "
            >
              Shared board workspace
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}