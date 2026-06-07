import { Bot } from "lucide-react"

export function AIAssistantPanel() {
  return (
    <section className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10">
  <div className="mb-4 flex items-center gap-2">
    <Bot className="h-4 w-4 text-purple-300" aria-hidden="true" />
    <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
  </div>

  <p className="text-xs leading-5 text-slate-400">
    Ready to summarize notes, generate templates, and turn whiteboard
    fragments into structured project pages.
  </p>

  <button
    type="button"
    className="mt-5 w-full rounded-xl border border-purple-300/20 bg-purple-400/10 px-4 py-2.5 text-xs font-medium text-purple-100 transition hover:bg-purple-400/15"
  >
    Open assistant
  </button>
</section>
  )
}