import { Box, useColorMode, Flex, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import lightBgImage from "../assets/bg_desktop_light.png";
import darkBgImage from "../assets/bg_desktop_dark.jpeg";
import TodoList from "../components/TodoList";
import { StatusBar } from "../components/StatusBar";
import ThemeSwithcer from "../components/ThemeSwither";
import InputSection from "../components/InputSection";
import { useTodoState } from "../app/lib/useTodoHook";

interface TodoProps {
  initState?: boolean;
}
const Todo: React.FC<TodoProps> = ({ initState = false }) => {
  const { colorMode } = useColorMode();
  const {
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
    handleAddTodo,
    currentTab,
    handleTabClick,
  } = useTodoState(initState);

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
        <ThemeSwithcer />
        <Box w={{ base: "80%", md: "60%", lg: "40%" }} p="4em 0" m="auto">
          <Header />
          <InputSection
            addNewTodo={addNewTodo}
            todo={todo}
            setTodo={setTodo}
            handleAddTodo={handleAddTodo}
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
                handleCompletedTodo={handleCompletedTodo}
                handleDeleteTodo={handleDeleteTodo}
                setTodos={setTodos}
                todosLoaded={todosLoaded}
              />
            </Box>
            <StatusBar
              itemLeft={itemLeft}
              handleClearAllClick={handleClearAllClick}
              currentTab={currentTab}
              handleTabClick={handleTabClick}
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
};

export default Todo;
