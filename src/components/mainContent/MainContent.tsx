import React, { useCallback, useState } from "react";
import { ActivePage } from "../../types";
import useLoadTodo from "../../hooks/useLoadTodo";

const ActiveTodoList = React.lazy(
  () => import("../activeTodoList/ActiveTodoList"),
);
const Nav = React.lazy(() => import("../nav/Nav"));
const TodoForm = React.lazy(() => import("../todoForm/TodoForm"));

const MainContent: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>("all");

  // Хук загружающий начальное состояние для него
  const [todoList, setTodos] = useLoadTodo();

  // Функция для изменения состояния todo, показывает выполнен ли пункт
  const onToggleCompleted = useCallback((id: number) => {
    setTodos(
      (prevTodos) =>
        prevTodos &&
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
    );
  }, []);

  // Функция очистки выполненных действий
  const onClearCompleted = useCallback(() => {
    setTodos(
      (prevTodos) =>
        prevTodos &&
        prevTodos
          .filter((todo) => todo.completed === false)
          .map((todo, index) => ({ ...todo, id: index + 1 })),
    );
    try {
      localStorage.setItem(
        "todosList",
        JSON.stringify(
          todoList &&
            todoList
              .filter((todo) => todo.completed === false)
              .map((todo, index) => ({ ...todo, id: index + 1 })),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

  const activeList = todoList.filter((todo) => todo.completed === false);

  const completedList = todoList.filter((todo) => todo.completed === true);

  const itemsLeft = todoList.filter((i) => i.completed === false).length;

  return (
    <main className="flex grow h-fit w-full flex-col items-center text-black">
      <div className="font-roboto h-full w-full grow font-light">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="relative h-full w-full">
            {/* страница всех дел */}
            <section
              className={`${activePage === "all" ? "z-20 translate-y-0 opacity-100" : activePage === "active" ? "z-10 translate-y-[77px] scale-x-97" : "z-0 translate-y-[87px] scale-x-95"} absolute flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 dark:bg-zinc-700`}
            >
              {/* форма для инпута */}
              <div
                className={`${activePage === "all" ? "opacity-100" : "opacity-0"} sticky top-0 left-0 z-10 border-b-2 border-zinc-200 bg-white p-5 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-600`}
              >
                <TodoForm todoList={todoList} setTodos={setTodos} />
              </div>
              <div
                className={`${activePage === "all" ? "opacity-100" : "opacity-0"} relative flex h-full grow flex-col overflow-y-auto`}
              >
                <ActiveTodoList
                  todoList={todoList}
                  onToggleCompleted={onToggleCompleted}
                />
              </div>
            </section>
            {/* страница активный дел */}
            <section
              className={`${activePage === "active" ? "z-20 translate-y-0" : "z-10 translate-y-[77px] scale-x-97"} absolute flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 dark:bg-zinc-700`}
            >
              <div
                className={`${activePage === "active" ? "opacity-100" : "opacity-0"} flex grow flex-col overflow-y-auto transition-all duration-300`}
              >
                <ActiveTodoList
                  todoList={activeList}
                  onToggleCompleted={onToggleCompleted}
                />
              </div>
            </section>
            {/* страница выполненных дел */}
            <section
              className={`${activePage === "completed" ? "z-20 translate-y-0" : "z-0 translate-y-[87px] scale-x-95"} absolute bottom-0 flex h-full w-full flex-col overflow-hidden bg-white transition-all duration-300 dark:bg-zinc-700`}
            >
              <div
                className={`${activePage === "completed" ? "opacity-100" : "opacity-0"} flex grow flex-col overflow-y-auto transition-all duration-300`}
              >
                <ActiveTodoList
                  todoList={completedList}
                  onToggleCompleted={onToggleCompleted}
                />
              </div>
            </section>
          </div>
          <Nav
            itemsLeft={itemsLeft}
            onClearCompleted={onClearCompleted}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
