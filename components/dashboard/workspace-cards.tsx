import { workspaceCards } from "@/components/dashboard/dashboard-data"
import { cn } from "@/lib/utils"

export function WorkspaceCards() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {workspaceCards.map((card) => (
        <article
          key={card.title}
          className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className={cn("h-2.5 w-2.5 rounded-full", card.accent)} />
            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[0.68rem] text-slate-400">
              {card.meta}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white">
            {card.title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {card.description}
          </p>
        </article>
      ))}
    </section>
  )
}