import { FormEvent, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Footer from './components/Footer';

export interface TodoList {
  id: string | number;
  text: string;
  completed: boolean;
}

export type ActivePage = 'all' | 'active' | 'completed';

function App() {
  const [todoList, setTodos] = useState([
    { id: 1, text: 'Покрытие тестами', completed: false },
    { id: 2, text: 'Прекрасный код', completed: true },
    { id: 3, text: 'Тестовое задание', completed: false },
  ]);

  const [activePage, setActivePage] = useState<ActivePage>('all');

  const [newTodoText, setNewTodoText] = useState<string>('');

  // Функция для изменения состояния todo, показывает выполнен ли пункт
  const onToggleCompleted = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Функция очистки выполненных действий
  const onClearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos
        .filter((todo) => todo.completed === false)
        .map((todo, index) => ({ ...todo, id: index + 1 }))
    );
  };

  // Функция добавления нового действия в список задач
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      const text = newTodoText.trim();
      if (newTodoText) {
        setTodos(
          (prevTodos) =>
            new Array(
              {
                id: prevTodos.length + 1,
                text: text,
                completed: false,
              },
              ...prevTodos
            )
        );
        setNewTodoText('');
      }
    }
  };

  const itemsLeft = todoList.filter((i) => i.completed === false).length;

  return (
    <>
      <section className='flex flex-col items-center text-black bg-gray-200 h-[100svh] pb-[50px]'>
        <div className=''>
          <h1 className='text-yellow-600 text-[9rem] font-poppins font-extralight'>
            todos
          </h1>
        </div>
        <div className='bg-white w-11/12 h-8/12 max-w-[808px] shadow-2xl font-roboto font-light '>
          <div className='flex flex-col justify-between w-full h-full'>
            <div className='flex flex-col relative w-full h-full'>
              {/* страница всех дел */}
              {activePage === 'all' && (
                <>
                  <div className='sticky top-0 left-0 p-5 border-b-2 border-gray-200 bg-white'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addTodo(e);
                      }}
                      className='flex justify-between items-center '
                    >
                      <input
                        type='text'
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        className='focus:outline-0 italic text-2xl grow'
                        placeholder='What needs to be done?'
                      />
                      <button
                        type='submit'
                        className='text-white rounded disabled:bg-gray-300 w-6 h-6'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          x='0px'
                          y='0px'
                          width='auto'
                          height='auto'
                          viewBox='0 0 50 50'
                        >
                          <path d='M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z'></path>
                        </svg>
                      </button>
                    </form>
                  </div>
                  <div className='flex grow flex-col h-[300px] overflow-y-auto'>
                    {todoList?.map((item) => (
                      <Todo
                        key={item.id}
                        id={item.id}
                        completed={item.completed}
                        onToggleCompleted={onToggleCompleted}
                      >
                        <p>{item.text}</p>
                      </Todo>
                    ))}
                  </div>
                </>
              )}
              {/* страница активный дел */}
              {activePage === 'active' && (
                <div className='grow flex flex-col h-[300px] overflow-y-auto'>
                  {todoList
                    ?.filter((todo) => todo.completed === false)
                    .map((item) => (
                      <Todo
                        key={item.id}
                        id={item.id}
                        completed={item.completed}
                        onToggleCompleted={onToggleCompleted}
                      >
                        <p>{item.text}</p>
                      </Todo>
                    ))}
                </div>
              )}
              {/* страница выполненных дел */}
              {activePage === 'completed' && (
                <div className='flex flex-col h-[300px]'>
                  {todoList
                    ?.filter((todo) => todo.completed === true)
                    .map((item) => (
                      <Todo
                        key={item.id}
                        id={item.id}
                        completed={item.completed}
                        onToggleCompleted={onToggleCompleted}
                      >
                        <p>{item.text}</p>
                      </Todo>
                    ))}
                </div>
              )}
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
