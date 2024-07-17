import { FC, Dispatch, SetStateAction } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "../services/Todo.dto";
import TodoItem from "./TodoItem";
import service from "../services";
import StrictModeDroppable from "./StrictModeDroppable";
import { v4 } from "uuid";

const reorder = (
  list: Todo[],
  startIndex: number,
  endIndex: number
): Todo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface TodoListProps {
  todos: Todo[];
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todosLoaded: boolean;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  handleCompletedTodo,
  handleDeleteTodo,
  setTodos,
  todosLoaded,
}) => {
  if (!todosLoaded) {
    return <div>Loading...</div>;
  }

  const isDragDisabled = todos.length === 1;
  const { updateReOrderedTodos } = service;

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const updatedTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(updatedTodos);
    await updateReOrderedTodos(updatedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId={v4()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.length > 0 &&
              todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleCompletedTodo={handleCompletedTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  isDragDisabled={isDragDisabled}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default TodoList;
