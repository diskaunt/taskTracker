import { FormEvent, memo, useState } from "react";
import Icon from "../icon/Icon";
import { TodoList } from "../../types";

type TodoFormProps = {
  todoList: TodoList[];
  setTodos: React.Dispatch<React.SetStateAction<TodoList[]>>;
};

const TodoForm: React.FC<TodoFormProps> = memo(({ todoList, setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  // Функция добавления нового действия в список задач
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      const text = newTodoText.trim();
      //
      if (text && todoList) {
        const newTodoList = [
          {
            id: todoList.length + 1,
            text: text,
            completed: false,
          },
          ...todoList,
        ];
        setTodos(newTodoList);
        setNewTodoText("");
        // Записываем в локальное хранилище
        try {
          localStorage.setItem("todosList", JSON.stringify(newTodoList));
        } catch (error) {
          console.error("Failed to save todos:", error);
        }
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(e);
      }}
      className="flex items-center justify-between"
    >
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        className="grow text-2xl text-black italic transition-colors focus:outline-0 dark:text-zinc-200"
        placeholder="What needs to be done?"
      />
      <button
        type="submit"
        data-testid="addTodo-button"
        disabled={newTodoText ? false : true}
        className="h-max w-max stroke-green-500 stroke-4 disabled:cursor-not-allowed disabled:stroke-zinc-400 dark:stroke-green-400 dark:disabled:stroke-zinc-200"
      >
        <Icon name="CheckMark" className="h-[24px] w-[24px]" />
      </button>
    </form>
  );
});

export default TodoForm;
