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
      <div className="flex items-center gap-4 border-b border-gray-200 p-4 transition-colors hover:bg-gray-50">
        <input
          id={String(id)}
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
          className="h-5 w-5 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="grow" htmlFor={String(id)}>
          <p
            className={`flex-1 cursor-pointer text-2xl ${
              completed ? "text-gray-400 line-through" : "text-gray-800"
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
