interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TodosResponse {
  todos: Todo[] | PromiseLike<Todo[]>;
}
