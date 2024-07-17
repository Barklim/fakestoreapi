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
import { addTodo, deleteTodo, fetchTodos, markTodoCompleted } from "./actions";
import TodoList from "./components/TodoList";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

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
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(await fetchTodos());
  };

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

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
          w={"50%"}
          p="4em 0"
          m="auto"
          position={"absolute"}
          left={{ lg: "23.2em", md: "15.2em", base: "11.2em" }}
          borderRadius={"5px"}
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
        <Box
          w={"50%"}
          position={"absolute"}
          top={"-74"}
          left={{ lg: "23.2em", md: "15.2em", base: "11.2em" }}
          borderRadius={"5px"}
          background={colorMode === "light" ? "white" : "#1a202c"}
        >
          <Box maxH={"50vh"} overflowY={"auto"}>
            <TodoList
              todos={todos}
              colorMode={colorMode}
              handleCompletedTodo={handleCompletedTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
