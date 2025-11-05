export interface TodoList {
  id: number;
  text: string;
  completed: boolean;
}

export type ActivePage = "all" | "active" | "completed";

export interface NavProps {
  itemsLeft?: number;
  activePage: ActivePage;
  setActivePage: (activePage: ActivePage) => void;
  onClearCompleted: () => void;
}
