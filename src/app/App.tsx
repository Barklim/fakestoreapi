import "./styles/App.css";
import {
  Box,
  Button,
  useColorMode,
  Image,
  Flex,
  Text,
  SystemStyleObject,
} from "@chakra-ui/react";
import Header from "../components/Header";
import InputButton from "../components/InputButton";
import lightBgImage from "../assets/bg_desktop_light.png";
import darkBgImage from "../assets/bg_desktop_dark.jpeg";
import { useEffect, useState, KeyboardEvent } from "react";
import { v4 } from "uuid";
import TodoList from "../components/TodoList";
import { StatusBar } from "../components/StatusBar";
import { Todo } from "../services/Todo.dto";
import service from "../services";

import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
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
    countUncompletedTodo().then((count) => setItemLeft(count));
  }, [todos]);

  useEffect(() => {
    fetchTodos().then((data) => {
      if (!data || data.length === 0) {
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
            _hover={"none" as SystemStyleObject}
            _active={"none" as SystemStyleObject}
          >
            <Image src={colorMode !== "light" ? moonIcon : sunIcon} />
          </Button>
        </Flex>
        <Box w={{ base: "80%", md: "60%", lg: "40%" }} p="4em 0" m="auto">
          <Header />

          <Box m="auto" w="100%">
            <Flex
              justifyContent={"space-between"}
              gap={"1em"}
              alignItems={"center"}
              w={"100%"}
            >
              <InputButton
                todo={todo}
                setTodo={setTodo}
                addTodo={handleAddTodo}
              />
              <Button
                background={colorMode === "light" ? "white" : "#1a202c"}
                h={"3.5em"}
                w={"6em"}
                _hover={
                  colorMode === "light"
                    ? undefined
                    : ("none" as SystemStyleObject)
                }
              >
                Add
              </Button>
            </Flex>
          </Box>
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
                handleCompletedTodo={handleCompletedTodo}
                handleDeleteTodo={handleDeleteTodo}
                setTodos={setTodos}
                todosLoaded={todosLoaded}
              />
            </Box>
            <StatusBar
              itemLeft={itemLeft}
              handleClearAllClick={handleClearAllClick}
              handleAllClick={handleAllClick}
              handleActiveClick={handleActiveClick}
              handleCompletedClick={handleCompletedClick}
            />
          </Box>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            color={"grey"}
            fontWeight={"700"}
            fontSize={"large"}
            mt={"10"}
          >
            <Text userSelect={"none"}>Drag & drop to reorder list</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default App;
