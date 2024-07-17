import axios from "axios";
import { API_URL, getApiUrl } from "../config";
import { Todo, TodosResponse } from "./Todo.dto";
import { TodoService } from "./TodoService";
import { initTodoList } from "../app/lib/initTodos";

const url = getApiUrl()

class ApiService implements TodoService {
  async fetchTodos(): Promise<Todo[]> {
    const { data } = await axios.get<TodosResponse>(`${url}/data`);
    return data.todos as Todo[];
  }

  async addTodo(todo: Todo): Promise<void> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    const newData: Todo[] = [todo, ...todos];
    await axios.post(`${API_URL}/data`, { todos: newData });
  }

  initTodos = async (): Promise<Todo[]> => {
    const todos = initTodoList;
    return await axios.post(`${API_URL}/data`, { todos: todos });
  };

  async isTodoCompleted(id: string): Promise<boolean | undefined> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    const todo = todos.find((todo) => todo.id === id);
    return todo?.isCompleted;
  }

  async markTodoCompleted(id: string): Promise<void> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    todos.forEach((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
    });
    await axios.post(`${API_URL}/data`, { todos });
  }

  async deleteTodo(id: string): Promise<void> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    const updatedData = todos.filter((todo) => todo.id !== id);
    await axios.post(`${API_URL}/data`, { todos: updatedData });
  }

  async countUncompletedTodo(): Promise<number> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    return todos.filter((todo) => !todo.isCompleted).length;
  }

  async clearAllCompletedTodos(): Promise<void> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    const updatedData = todos.filter((todo) => !todo.isCompleted);
    await axios.put(`${API_URL}/data`, { todos: updatedData });
  }

  async getActiveTodos(): Promise<Todo[]> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    return todos.filter((todo) => !todo.isCompleted);
  }

  async getCompletedTodos(): Promise<Todo[]> {
    const { data } = await axios.get<TodosResponse>(`${API_URL}/data`);
    const todos: Todo[] = data.todos as Todo[];
    return todos.filter((todo) => todo.isCompleted);
  }

  async updateReOrderedTodos(todos: Todo[]): Promise<void> {
    await axios.put(`${API_URL}/data`, { todos });
  }
}

export default ApiService;
