import { Todo } from "../actions/Todo.dto";
import { Dispatch, SetStateAction } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { updateReOrderedTodos } from "../actions";
import { v4 } from "uuid";

const reorder = (list: Todo[], startIndex: number, endIndex: number): Todo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface TodoItemProps {
  colorMode: "light" | "dark";
  todos: Todo[];
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  colorMode = "dark",
  handleCompletedTodo,
  handleDeleteTodo,
  setTodos,
}: TodoItemProps) => {
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
    <DragDropContext onDragEnd={onDragEnd} enableDefaultSensors >
      <Droppable droppableId={v4()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.length > 0 &&
              todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  colorMode={colorMode}
                  todo={todo}
                  handleCompletedTodo={handleCompletedTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
