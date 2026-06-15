type PriorityBadgeProps = {
  priority: "low" | "medium" | "high"
}

export function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const styles = {
    low: "bg-emerald-500/20 text-emerald-300",
    medium: "bg-yellow-500/20 text-yellow-300",
    high: "bg-red-500/20 text-red-300",
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  )
}