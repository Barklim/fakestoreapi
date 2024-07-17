import "./App.css";
import { Box, Button, useColorMode, Image, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import InputButton from "./components/InputButton";
import lightBgImage from "./assets/bg_desktop_light.png";
import darkBgImage from "./assets/bg_desktop_dark.jpeg";
import { useEffect, useState, KeyboardEvent } from "react";
import { v4 } from "uuid";

import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";
import {
  addTodo,
  clearAllCompletedTodos,
  countUncompletedTodo,
  deleteTodo,
  fetchTodos,
  getActiveTodos,
  getCompletedTodos,
  markTodoCompleted,
} from "./actions";
import TodoList from "./components/TodoList";
import { StatusBar } from "./components/StatusBar";
import { Todo } from "./actions/Todo.dto";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [itemLeft, setItemLeft] = useState<number>(0);

  const handleAddTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (todo && e.keyCode === 13) {
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

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    countUncompletedTodo().then((count) => setItemLeft(count));
  }, [todos]);

  return (
    <>
      <Box
        backgroundImage={colorMode !== "light" ? lightBgImage : darkBgImage}
        backgroundSize={"cover"}
        content={"center"}
        h={"40vh"}
        w={"100%"}
        p={0}
      >
        <Flex justifyContent={"end"} alignItems={"top"}>
          <Button
            variant={"ghost"}
            onClick={toggleColorMode}
            _hover="none"
            _active="none"
          >
            <Image src={colorMode !== "light" ? moonIcon : sunIcon} />
          </Button>
        </Flex>
        <Box
          w={{ base: "80%", md: "60%", lg: "40%" }}
          p="4em 0"
          m="auto"
        >
          <Header />
          <InputButton
            colorMode={colorMode}
            todo={todo}
            setTodo={setTodo}
            addTodo={handleAddTodo}
          />
        </Box>
      </Box>

      <Box
        h={"60vh"}
        backgroundSize={"cover"}
        background={"#242424"}
        position={"relative"}
      >
        <Box minW={"100%"} m={"auto"} position={"absolute"} top={"-74"}>
          <Box w={{ base: "80%", md: "60%", lg: "40%" }} m={"auto"}>
            <Box
              maxH={"50vh"}
              overflowY={"auto"}
              borderTopRadius={"10px"}
              backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
            >
              <TodoList
                todos={todos}
                colorMode={colorMode}
                handleCompletedTodo={handleCompletedTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            </Box>
            <StatusBar
              colorMode={colorMode}
              itemLeft={itemLeft}
              handleClearAllClick={handleClearAllClick}
              handleAllClick={handleAllClick}
              handleActiveClick={handleActiveClick}
              handleCompletedClick={handleCompletedClick}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
