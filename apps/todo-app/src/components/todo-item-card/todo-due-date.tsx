import { Clock } from "lucide-react"
import { format } from "date-fns"

interface TodoDueDateProps {
  dueDate: string
}

export function TodoDueDate({ dueDate }: TodoDueDateProps) {
  return (
    <div className="inline-flex items-center border-black/15 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
      <Clock className="w-3 h-3 mr-1" />
      <span>{format(new Date(dueDate), "MMM d h:mm a")}</span>
    </div>
  )
}
