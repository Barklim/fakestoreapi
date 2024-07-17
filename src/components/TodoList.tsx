import { Todo } from "../actions/Todo.dto";
import { Dispatch, SetStateAction } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { updateReOrderedTodos } from "../actions";
import { v4 } from "uuid";
import StrictModeDroppable from "./StrictModeDroppable";

const reorder = (list: Todo[], startIndex: number, endIndex: number): Todo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface TodoItemProps {
  todos: Todo[];
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  handleCompletedTodo,
  handleDeleteTodo,
  setTodos,
}: TodoItemProps) => {
  const isDragDisabled = todos.length === 1;
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
