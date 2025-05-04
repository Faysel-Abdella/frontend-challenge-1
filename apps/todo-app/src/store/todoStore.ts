import { atom, selector } from "recoil"
import type { Todo, TodoLabelColor } from "../types/todo"
import { v4 as uuidv4 } from "uuid"

// Local storage persistence
import type { AtomEffect } from "recoil"

const localStorageEffect =
  <T extends { length: number }>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue: T) => {
      if (newValue.length === 0) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

// Todos atom
export const todosState = atom<Todo[]>({
  key: "todosState",
  default: [],
  effects: [localStorageEffect("todos")],
})

// Filter atom
export const todoFilterState = atom<string>({
  key: "todoFilterState",
  default: "all",
})

// Search query atom
export const todoSearchState = atom<string>({
  key: "todoSearchState",
  default: "",
})

// New states for form management
export const formModeState = atom<"create" | "edit">({
  key: "formModeState",
  default: "create",
})

export const formDataState = atom<{
  id: string
  title: string 
  description?: string
  dueDate?: string
  dueTime?: string
  label?: string
  labelColor?: TodoLabelColor
  status: string
  color?: string
} | null>({
  key: "formDataState",
  default: null,
})

export const formOpenState = atom<boolean>({
  key: "formOpenState",
  default: false,
})

// Filtered todos selector
export const filteredTodosState = selector({
  key: "filteredTodosState",
  get: ({ get }) => {
    const todos = get(todosState)
    const filter = get(todoFilterState)
    const searchQuery = get(todoSearchState).toLowerCase()

    let filtered = [...todos]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery) ||
          (todo.description && todo.description.toLowerCase().includes(searchQuery)) ||
          (todo.label && todo.label.toLowerCase().includes(searchQuery)),
      )
    }

    // Main filters
    switch (filter) {
      case "incomplete":
        filtered = filtered.filter((todo) => !todo.completed)
        break
      case "completed":
        filtered = filtered.filter((todo) => todo.completed)
        break
      case "deadlinePassed":
        filtered = filtered.filter((todo) => todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed)
        break
      case "latestCreated":
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    return filtered
  },
})

// Grouped todos by status
export const groupedTodosState = selector({
  key: "groupedTodosState",
  get: ({ get }) => {
    const todos = get(todosState)

    return {
      todo: todos.filter((todo) => todo.status === "todo"),
      "in-progress": todos.filter((todo) => todo.status === "in-progress"),
      done: todos.filter((todo) => todo.status === "done"),
    }
  },
})

// Helper functions for CRUD operations of the todo
export const createTodo = (
  todoData: Omit<Todo, "id" | "createdAt" | "completed"> & {
    icon?: string | null
  },
): Todo => {
  return {
    id: uuidv4(),
    title: todoData.title,
    description: todoData.description || "",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: todoData.dueDate,
    dueTime: todoData.dueTime,
    label: todoData.label,
    labelColor: todoData.labelColor,
    status: todoData.status,
    icon: todoData.icon || null, // Include the icon here
    color: todoData.color,
  }
}

export const updateTodo = (
  todos: Todo[],
  todoId: string,
  updatedTodoData: Partial<Omit<Todo, "id" | "createdAt">>,
): Todo[] => {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, ...updatedTodoData } : todo))
}

export const deleteTodo = (todos: Todo[], todoId: string): Todo[] => {
  return todos.filter((todo) => todo.id !== todoId)
}

export const toggleTodoCompletion = (todos: Todo[], todoId: string): Todo[] => {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
}
