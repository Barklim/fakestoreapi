import { useEffect, useState } from "react";
import { v4 } from "uuid";
import service from "../../services";
import { Todo } from "../../services/Todo.dto";

export const useTodoState = (initState: boolean) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [itemLeft, setItemLeft] = useState<number>(0);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const {
    addTodo,
    initTodos,
    clearAllCompletedTodos,
    countUncompletedTodo,
    deleteTodo,
    fetchTodos,
    getActiveTodos,
    getCompletedTodos,
    markTodoCompleted,
  } = service;

  useEffect(() => {
    countUncompletedTodo().then((count) => setItemLeft(count));
  }, [todos]);

  useEffect(() => {
    
      fetchTodos().then((data) => {
        if (!data || data.length === 0 && initState) {
          initTodos().then(() => {
            fetchTodos().then((updatedTodos) => {
              setTodos(updatedTodos);
              setTodosLoaded(true);
            });
          });
        } else {
          setTodos(data);
          setTodosLoaded(true);
        }
      });
  }, []);

  const addNewTodo = async () => {
    if (todo) {
      const newTodo = {
        id: v4(),
        title: todo,
        isCompleted: false,
      };

      await addTodo(newTodo);
      setTodos(await fetchTodos());
      setTodo("");
    }
  };

  const handleCompletedTodo = async (id: string) => {
    await markTodoCompleted(id);
    countUncompletedTodo().then((count) => setItemLeft(count));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(await fetchTodos());
  };

  const handleClearAllClick = async () => {
    await clearAllCompletedTodos();
    fetchTodos().then((data) => setTodos(data));
  };

  const handleAllClick = async () => {
    fetchTodos().then((data) => setTodos(data));
  };

  const handleActiveClick = async () => {
    getActiveTodos().then((todos) => setTodos(todos));
  };

  const handleCompletedClick = async () => {
    getCompletedTodos().then((todos) => setTodos(todos));
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      addNewTodo();
    }
  };

  return {
    todo,
    setTodo,
    setTodos,
    todos,
    itemLeft,
    todosLoaded,
    addNewTodo,
    handleCompletedTodo,
    handleDeleteTodo,
    handleClearAllClick,
    handleAllClick,
    handleActiveClick,
    handleCompletedClick,
    handleAddTodo,
  };
};
