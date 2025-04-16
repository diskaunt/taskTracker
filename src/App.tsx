import { FormEvent, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import Footer from "./components/Footer";
import useLoadTodo from "./hooks/useLoadTodo";

export interface TodoList {
  id: number;
  text: string;
  completed: boolean;
}

export type ActivePage = "all" | "active" | "completed";

function App() {
  const [todoList, setTodos] = useState<TodoList[] | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>("all");

  const [newTodoText, setNewTodoText] = useState<string>("");

  // Функция для изменения состояния todo, показывает выполнен ли пункт
  const onToggleCompleted = (id: number) => {
    setTodos(
      (prevTodos) =>
        prevTodos &&
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
    );
  };

  // Функция очистки выполненных действий
  const onClearCompleted = () => {
    setTodos(
      (prevTodos) =>
        prevTodos &&
        prevTodos
          .filter((todo) => todo.completed === false)
          .map((todo, index) => ({ ...todo, id: index + 1 })),
    );
  };

  // Хук обновляющий локальное хранилище при каждом изменении листа дел и загружающий начальное состояние для него
  useLoadTodo(todoList, setTodos);

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

  const itemsLeft = todoList?.filter((i) => i.completed === false).length;

  return (
    <>
      <section className="flex h-[100svh] w-full flex-col items-center bg-gray-200 pb-[50px] text-black">
        <div className="">
          <h1 className="font-poppins text-shadow-2xl-lg text-[9rem] font-extralight text-yellow-600 text-shadow-zinc-600">
            todos
          </h1>
        </div>
        <div className="font-roboto h-8/12 w-11/12 max-w-[808px] font-light">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="relative h-full w-full">
              {/* страница всех дел */}
              {/* {activePage === "all" && ( */}
              <div
                className={`${activePage === "all" ? "z-20" : activePage === "active" ? "-bottom-[77px] z-10 scale-x-97" : "-bottom-[87px] z-0 scale-x-95"} absolute flex h-full w-full flex-col bg-white shadow-2xl transition-all duration-300`}
              >
                <div className="sticky top-0 left-0 z-10 border-b-2 border-gray-200 bg-white p-5 hover:hover:bg-gray-50">
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
                      className="grow text-2xl italic transition-colors focus:outline-0"
                      placeholder="What needs to be done?"
                    />
                    <button
                      type="submit"
                      data-testid="addTodo-button"
                      disabled={newTodoText ? false : true}
                      className="h-full w-6 rounded border-r stroke-green-200 text-white disabled:stroke-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
                      </svg>
                    </button>
                  </form>
                </div>
                <div
                  className={`${activePage === "all" ? "opacity-100" : "opacity-0"} flex h-full min-h-[300px] grow flex-col overflow-y-auto`}
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
              {/* )} */}
              {/* страница активный дел */}
              {/* {activePage === "active" && ( */}
              <div
                className={`${activePage === "active" ? "z-20" : "-bottom-[77px] z-10 scale-x-97"} absolute flex h-full w-full flex-col bg-white shadow-2xl transition-all duration-300`}
              >
                <div
                  className={`${activePage === "active" ? "opacity-100" : "opacity-0"} flex min-h-[300px] grow flex-col overflow-y-auto`}
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
              {/* )} */}
              {/* страница выполненных дел */}
              <div
                className={`${activePage === "completed" ? "z-20" : "-bottom-[87px] z-0 scale-x-95"} absolute flex h-full w-full flex-col bg-white transition-all duration-300`}
              >
                {/* {activePage === "completed" && ( */}
                <div
                  className={`${activePage === "completed" ? "opacity-100" : "opacity-0"} flex min-h-[300px] grow flex-col overflow-y-auto`}
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
                {/* )} */}
              </div>
            </div>
            {/* подвал страницы */}
            <Footer
              itemsLeft={itemsLeft}
              activePage={activePage}
              setActivePage={setActivePage}
              onClearCompleted={onClearCompleted}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
