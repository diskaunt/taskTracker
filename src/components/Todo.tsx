import React, { ReactNode } from 'react';

export interface Todo {
  id: number;
  children: ReactNode;
  completed?: boolean;
  onToggleCompleted: (id: number) => void;
}

const Todo = ({ id, children, completed = false, onToggleCompleted }: Todo) => {
  return (
    <div className='flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors'>
      <input
        id={String(id)}
        type='checkbox'
        checked={completed}
        onChange={() => onToggleCompleted(id)}
        className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
      />
      <label htmlFor={String(id)}>
        <p
          className={`flex-1 text-2xl cursor-pointer ${
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {children}
        </p>
      </label>
    </div>
  );
};

export default Todo;
