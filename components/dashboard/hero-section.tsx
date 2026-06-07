export function HeroSection() {
  return (
    <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/80 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-violet-200">
            Your calm command surface
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Notes, whiteboards, tasks, and AI context in one focused workspace.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Keep strategy, daily work, and creative exploration close without
            turning the interface into noise.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
          {[
            ["Active spaces", "08"],
            ["Open tasks", "24"],
            ["AI drafts", "13"],
          ].map(([label, value]) => (
            <div key={label} className="min-w-24 rounded-lg bg-slate-800/70 p-3">
              <p className="text-xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-wide text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}