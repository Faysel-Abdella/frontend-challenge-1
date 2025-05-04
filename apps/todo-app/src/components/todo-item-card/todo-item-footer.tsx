import { cn } from "@/lib/utils"
import type { Todo } from "../../types/todo"
import { TodoLabel } from "./todo-label"
import { TodoDueDate } from "./todo-due-date"

interface TodoItemFooterProps {
  todo: Todo
}

export function TodoItemFooter({ todo }: TodoItemFooterProps) {
  return (
    <div className={cn("mt-3 flex flex-wrap w-full gap-2 items-center", todo.completed ? "opacity-40" : "opacity-100")}>
      {todo.label && <TodoLabel label={todo.label} labelColor={todo.labelColor} />}

      {todo.dueDate && <TodoDueDate dueDate={todo.dueDate} />}
    </div>
  )
}
