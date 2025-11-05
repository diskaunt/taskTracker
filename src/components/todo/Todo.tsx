import { memo, ReactNode } from "react";

export interface Todo {
  id: number;
  children: ReactNode;
  completed?: boolean;
  onToggleCompleted: (id: number) => void;
}

const Todo = memo(
  ({ id, children, completed = false, onToggleCompleted }: Todo) => {
    return (
      <div className="flex items-center gap-4 border-b border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-500 dark:hover:bg-zinc-600">
        <input
          id={String(id)}
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
          className="h-5 w-5 cursor-pointer rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:text-indigo-400 dark:accent-zinc-400"
        />
        <label className="grow" htmlFor={String(id)}>
          <p
            className={`flex-1 cursor-pointer text-2xl ${
              completed
                ? "text-zinc-400 line-through"
                : "text-zinc-800 dark:text-zinc-200"
            }`}
          >
            {children}
          </p>
        </label>
      </div>
    );
  },
);

export default Todo;
