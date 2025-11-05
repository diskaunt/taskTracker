import { FormEvent, useCallback, useState } from "react";
import Todo from "../todo/Todo";
import { ActivePage } from "../../types";
import useLoadTodo from "../../hooks/useLoadTodo";
import Nav from "../nav/Nav";
import Icon from "../icon/Icon";

const MainContent: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>("all");
  const [newTodoText, setNewTodoText] = useState<string>("");

  // Хук обновляющий локальное хранилище при каждом изменении листа дел и загружающий начальное состояние для него
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
  }, []);

  // Функция добавления нового действия в список задач
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      const text = newTodoText.trim();
      if (text && todoList) {
        setTodos([
          {
            id: todoList.length + 1,
            text: text,
            completed: false,
          },
          ...todoList,
        ]);
        setNewTodoText("");
      }
    }
  };

  const itemsLeft = todoList.filter((i) => i.completed === false).length;

  return (
    <main className="h-main flex w-full flex-col items-center overflow-hidden pb-20 text-black">
      <div className="font-roboto h-max w-11/12 grow px-5 font-light">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="relative h-full w-full">
            {/* страница всех дел */}
            <div
              className={`${activePage === "all" ? "z-20 translate-y-0" : activePage === "active" ? "z-10 translate-y-[77px] scale-x-97" : "z-0 translate-y-[87px] scale-x-95"} absolute flex h-full w-full flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-zinc-700`}
            >
              <div
                className={`${activePage === "all" ? "opacity-100" : "opacity-0"} sticky top-0 left-0 z-10 border-b-2 border-zinc-200 bg-white p-5 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-600`}
              >
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
                    className="h-max w-max stroke-green-200 disabled:cursor-not-allowed disabled:stroke-zinc-400 dark:stroke-green-400 dark:disabled:stroke-zinc-200"
                  >
                    <Icon name="CheckMark" />
                  </button>
                </form>
              </div>
              {/* страница всех дел */}
              <div
                className={`${activePage === "all" ? "opacity-100" : "opacity-0"} flex h-full grow flex-col overflow-y-auto`}
              >
                {todoList?.map((item) => (
                  <Todo
                    key={item.id}
                    id={item.id}
                    completed={item.completed}
                    onToggleCompleted={onToggleCompleted}
                  >
                    {item.text}
                  </Todo>
                ))}
              </div>
            </div>
            {/* страница активный дел */}
            <div
              className={`${activePage === "active" ? "z-20 translate-y-0" : "z-10 translate-y-[77px] scale-x-97"} absolute flex h-full w-full flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-zinc-700`}
            >
              <div
                className={`${activePage === "active" ? "opacity-100" : "opacity-0"} flex grow flex-col overflow-y-auto transition-all duration-300`}
              >
                {todoList
                  ?.filter((todo) => todo.completed === false)
                  .map((item) => (
                    <Todo
                      key={item.id}
                      id={item.id}
                      completed={item.completed}
                      onToggleCompleted={onToggleCompleted}
                    >
                      {item.text}
                    </Todo>
                  ))}
              </div>
            </div>
            {/* страница выполненных дел */}
            <div
              className={`${activePage === "completed" ? "z-20 translate-y-0" : "z-0 translate-y-[87px] scale-x-95"} absolute bottom-0 flex h-full w-full flex-col bg-white transition-all duration-300 dark:bg-zinc-700`}
            >
              <div
                className={`${activePage === "completed" ? "opacity-100" : "opacity-0"} flex grow flex-col overflow-y-auto transition-all duration-300`}
              >
                {todoList
                  ?.filter((todo) => todo.completed === true)
                  .map((item) => (
                    <Todo
                      key={item.id}
                      id={item.id}
                      completed={item.completed}
                      onToggleCompleted={onToggleCompleted}
                    >
                      {item.text}
                    </Todo>
                  ))}
              </div>
            </div>
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
