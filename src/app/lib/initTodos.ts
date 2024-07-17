import initTodosDb from "../../../db.json";
import { v4 } from "uuid";

const todoList = initTodosDb.data?.todos || [];

export const initTodoList = todoList.map(
  (todo: { title: string; isCompleted: boolean }) => ({
    id: v4(),
    title: todo.title,
    isCompleted: todo.isCompleted,
  })
);
