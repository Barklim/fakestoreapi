import { Todo } from "./Todo.dto";

export interface TodoService {
  fetchTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => Promise<void>;
  initTodos: () => Promise<Todo[]>;
  isTodoCompleted: (id: string) => Promise<boolean | undefined>;
  markTodoCompleted: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  countUncompletedTodo: () => Promise<number>;
  clearAllCompletedTodos: () => Promise<void>;
  getActiveTodos: () => Promise<Todo[]>;
  getCompletedTodos: () => Promise<Todo[]>;
  updateReOrderedTodos: (todos: Todo[]) => Promise<void>;
}
