import type React from "react"
import { Book, Briefcase, Home, ShoppingCart, Code, Tag, ListChecks, Star, Flag, Clock } from "lucide-react"
import type { TodoLabelColor } from "@/types/todo"

export interface PredefinedLabel {
  name: string
  color: TodoLabelColor
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  value: string
}

export const predefinedLabels: PredefinedLabel[] = [
  { name: "Study", color: "blue", icon: Book, value: "study" },
  { name: "Work", color: "indigo", icon: Briefcase, value: "work" },
  { name: "Personal", color: "green", icon: Home, value: "personal" },
  { name: "Shopping", color: "yellow", icon: ShoppingCart, value: "shopping" },
  { name: "Coding", color: "purple", icon: Code, value: "coding" },
]

export const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>> | undefined> = {
  "list-checks": ListChecks,
  star: Star,
  flag: Flag,
  tag: Tag,
  clock: Clock,
  book: Book,
  briefcase: Briefcase,
  home: Home,
  shoppingcart: ShoppingCart,
  code: Code,
}

export const availableIcons = [
  { name: "list-checks", component: ListChecks },
  { name: "star", component: Star },
  { name: "flag", component: Flag },
  { name: "tag", component: Tag },
  { name: "clock", component: Clock },
  { name: "book", component: Book },
  { name: "briefcase", component: Briefcase },
  { name: "home", component: Home },
  { name: "shoppingcart", component: ShoppingCart },
  { name: "code", component: Code },
]
