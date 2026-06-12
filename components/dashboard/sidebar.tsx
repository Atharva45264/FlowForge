"use client"

import { ChevronLeft, Search, Sparkles, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuGroups } from "@/components/dashboard/dashboard-data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <input
        id="sidebar-collapse-toggle"
        type="checkbox"
        className="sidebar-collapse-toggle sr-only"
        aria-label="Collapse sidebar"
      />

      <aside
        className="flowforge-sidebar flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-700/70 bg-[#111827] shadow-2xl shadow-slate-950/30 transition-[width] duration-300 ease-out"
        aria-label="Primary navigation"
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-700/60 px-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-indigo-300/20 bg-indigo-500/15 text-indigo-200 shadow-lg shadow-indigo-950/20">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="sidebar-expanded-only min-w-0 flex-1 transition-opacity duration-200">
            <p className="truncate text-sm font-semibold tracking-wide text-white">
              FlowForge
            </p>
            <p className="truncate text-xs text-slate-400">Cozy workspace OS</p>
          </div>
          <label
            htmlFor="sidebar-collapse-toggle"
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
            className="sidebar-collapse-button grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-slate-700/60 bg-slate-800/45 text-slate-400 transition hover:bg-slate-800 hover:text-indigo-200"
          >
            <ChevronLeft
              className="sidebar-collapse-icon h-4 w-4 transition-transform duration-300"
              aria-hidden="true"
            />
          </label>
        </div>

        <div className="border-b border-slate-700/50 px-3 py-3">
          <label
            className="sidebar-search flex h-8 w-full items-center gap-2.5 rounded-lg border border-slate-700/60 bg-slate-800/45 px-2.5 text-left text-[0.72rem] text-slate-500 transition hover:border-slate-600 hover:bg-slate-800/70 hover:text-slate-300"
            title="Search"
          >
            <Search
              className="h-3.5 w-3.5 shrink-0 text-indigo-300"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search workspace"
              aria-label="Search sidebar menu"
              className="flowforge-sidebar-search-input sidebar-expanded-only min-w-0 flex-1 bg-transparent text-[0.72rem] text-slate-200 outline-none placeholder:text-slate-500"
            />
            <span className="sidebar-expanded-only ml-auto rounded border border-slate-700/70 px-1.5 py-0.5 text-[0.62rem] text-slate-500">
              /
            </span>
          </label>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
          {menuGroups.map((group) => (
            <div key={group.label} className="sidebar-menu-group">
              <div className="sidebar-group-label mb-1.5 flex items-center gap-2 px-2.5 transition-opacity">
                <span className="h-px flex-1 rounded-full bg-slate-700/55" />
                <span className="sidebar-expanded-only shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {group.label}
                </span>
                <span className="h-px flex-1 rounded-full bg-slate-700/55" />
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      title={item.label}
                      aria-label={item.label}
                      data-label={item.label}
                      className={cn(
                        "sidebar-menu-item group flex h-8 w-full items-center gap-2.5 rounded-lg border border-transparent px-2.5 text-left text-[0.72rem] font-medium text-slate-400 transition-all duration-200 hover:border-slate-700/80 hover:bg-slate-800/55 hover:text-slate-100",
                        pathname === item.href &&
                          "border-indigo-400/20 bg-indigo-500/10 text-slate-50 shadow-sm shadow-indigo-950/20",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                          item.color,
                        )}
                        aria-hidden="true"
                      />
                      <span className="sidebar-expanded-only truncate transition-opacity duration-200">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-700/60 p-3">
          <div className="sidebar-footer-card mb-3 rounded-xl border border-slate-700/70 bg-slate-800/60 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-700/80 text-slate-200">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="sidebar-expanded-only min-w-0">
                <p className="truncate text-xs font-semibold text-slate-100">
                  Studio Space
                </p>
                <p className="truncate text-[0.7rem] text-slate-400">
                  Synced moments ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
