import axios from "axios";
import { URL } from "../config";
import { Todo, TodosResponse } from "./Todo.dto";

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<TodosResponse>(`${URL}/data`);
  return data.todos;
};

export const addTodo = async (todo: Todo): Promise<void> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];
  const newData: Todo[] = [todo, ...todos];

  await axios.post(`${URL}/data`, { todos: newData });
};

export const isTodoCompleted = async (
  id: string
): Promise<boolean | undefined> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  let completed: boolean | undefined;

  todos.forEach((todo) => {
    if (todo.id === id) completed = todo.isCompleted;
  });

  return completed;
};

export const markTodoCompleted = async (id: string): Promise<void> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  todos.forEach((todo) => {
    if (todo.id === id) todo.isCompleted = !todo.isCompleted;
  });

  await axios.post(`${URL}/data`, { todos });
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  const updatedData = todos.filter((todo) => todo.id !== id);

  await axios.post(`${URL}/data`, { todos: updatedData });
};

export const countUncompletedTodo = async (): Promise<number> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  return todos.filter((todo) => !todo.isCompleted).length;
};

export const clearAllCompletedTodos = async (): Promise<void> => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  const updatedData = todos.filter((todo) => !todo.isCompleted);

  await axios.put(`${URL}/data`, { todos: updatedData });
};

export const getActiveTodos = async () => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  return todos.filter((todo) => !todo.isCompleted);
};

export const getCompletedTodos = async () => {
  const response = await axios.get<TodosResponse>(`${URL}/data`);
  const todos: Todo[] = response.data.todos as Todo[];

  return todos.filter((todo) => todo.isCompleted);
};
