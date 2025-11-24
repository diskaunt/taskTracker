import { TodoList } from "../../types";
import Illustration from "../illustration/Illustration";
import Todo from "../todo/Todo";

type ActiveTodoListProps = {
  todoList: TodoList[];
  onToggleCompleted: (id: number) => void;
};

const ActiveTodoList: React.FC<ActiveTodoListProps> = ({
  todoList,
  onToggleCompleted,
}) => {
  return (
    <>
      <Illustration
        name="personWork"
        className="fixed top-1/2 left-1/2 -z-10 -translate-[50%]"
      />
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
    </>
  );
};

export default ActiveTodoList;
