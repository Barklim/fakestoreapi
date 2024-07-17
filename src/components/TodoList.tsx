import TodoItem from "./TodoItem";

import { Todo } from "../actions/Todo.dto";

interface TodoItemProps {
  colorMode: "light" | "dark";
  todos: Todo[];
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
}

const TodoList = ({
  todos,
  colorMode = "dark",
  handleCompletedTodo,
  handleDeleteTodo,
}: TodoItemProps) => {
  return (
    <>
      {todos.length > 0 &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            colorMode={colorMode}
            todo={todo}
            handleCompletedTodo={handleCompletedTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
    </>
  );
};

export default TodoList;
