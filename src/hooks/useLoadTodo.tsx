import { useEffect, useState } from "react";
import { TodoList } from "../types";

const initTodoList: TodoList[] = [];

const useLoadTodo = (): [
  TodoList[],
  React.Dispatch<React.SetStateAction<TodoList[]>>,
] => {
  const [todoList, setTodos] = useState<TodoList[]>(initTodoList);
  // загружаем список дел при первой загрузке
  useEffect(() => {
    try {
      const jsonTodoList = localStorage.getItem("todosList");
      if (jsonTodoList) {
        const parsedList = JSON.parse(jsonTodoList);
        setTodos(
          Array.isArray(parsedList) && parsedList.length > 0
            ? parsedList
            : initTodoList,
        );
      } else {
        setTodos(initTodoList);
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
      setTodos(initTodoList);
    }
  }, []);

  return [todoList, setTodos];
};

export default useLoadTodo;
