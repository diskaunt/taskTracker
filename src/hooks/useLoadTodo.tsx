import { useEffect, useState } from "react";
import { TodoList } from "../types";

const initTodoList = [
  { id: 1, text: "Покрытие тестами", completed: false },
  { id: 2, text: "Прекрасный код", completed: true },
  { id: 3, text: "Тестовое задание", completed: false },
];

const useLoadTodo = (): [
  TodoList[],
  React.Dispatch<React.SetStateAction<TodoList[]>>,
] => {
  const [todoList, setTodos] = useState<TodoList[]>([]);
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

  // сохраняем в локальное хранилища новые дела при изменение списка дел
  useEffect(() => {
    // это защищает от установки null при ререндере
    if (todoList) {
      try {
        localStorage.setItem("todosList", JSON.stringify(todoList));
      } catch (error) {
        console.error("Failed to save todos:", error);
      }
    }
  }, [todoList]);

  return [todoList, setTodos];
};

export default useLoadTodo;
