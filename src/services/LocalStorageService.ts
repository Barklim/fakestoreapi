import { Todo } from "./Todo.dto";
import { TodoService } from "./TodoService";
import { initTodoList } from "../app/lib/initTodos";

class LocalStorageService implements TodoService {
  fetchTodos = async (): Promise<Todo[]> => {
    const todos = localStorage.getItem("todos");

    return todos ? JSON.parse(todos) : [];
  };

  addTodo = async (todo: Todo): Promise<void> => {
    const todos = await this.fetchTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  initTodos = async (): Promise<Todo[]> => {
    const todos = initTodoList;
    localStorage.setItem("todos", JSON.stringify(todos));
    return todos;
  };

  isTodoCompleted = async (id: string): Promise<boolean | undefined> => {
    const todos = await this.fetchTodos();
    const todo = todos.find((todo) => todo.id === id);
    return todo?.isCompleted;
  };

  markTodoCompleted = async (id: string): Promise<void> => {
    const todos = await this.fetchTodos();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  deleteTodo = async (id: string): Promise<void> => {
    const todos = await this.fetchTodos();
    const updatedData = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedData));
  };

  countUncompletedTodo = async (): Promise<number> => {
    const todos = await this.fetchTodos();
    return todos.filter((todo) => !todo.isCompleted).length;
  };

  clearAllCompletedTodos = async (): Promise<void> => {
    const todos = await this.fetchTodos();
    const updatedData = todos.filter((todo) => !todo.isCompleted);
    localStorage.setItem("todos", JSON.stringify(updatedData));
  };

  getActiveTodos = async (): Promise<Todo[]> => {
    const todos = await this.fetchTodos();
    return todos.filter((todo) => !todo.isCompleted);
  };

  getCompletedTodos = async (): Promise<Todo[]> => {
    const todos = await this.fetchTodos();
    return todos.filter((todo) => todo.isCompleted);
  };

  updateReOrderedTodos = async (todos: Todo[]): Promise<void> => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
}

export default LocalStorageService;