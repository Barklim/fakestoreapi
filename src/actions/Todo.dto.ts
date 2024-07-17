export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodosResponse {
  todos: Todo[] | PromiseLike<Todo[]>;
}
