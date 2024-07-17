import "./App.css";
import { Box, Button, useColorMode, Image, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import InputButton from "./components/InputButton";
import lightBgImage from "./assets/bg_desktop_light.png";
import darkBgImage from "./assets/bg_desktop_dark.jpeg";
import { useState } from "react";
import { v4 } from "uuid";

import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async (e) => {
    if (todo && e.keyCode === 13) {
      const newTodo = {
        id: v4(),
        title: todo,
        isCompleted: false,
      };

      // Todo add action
      // await addTodo(newTodo);
    }
  };

  return (
    <>
      <Box
        backgroundImage={colorMode !== "light" ? lightBgImage : darkBgImage}
        backgroundSize={"cover"}
        content={"center"}
        h={"44vh"}
        w={"100%"}
        p={0}
      >

      <Flex justifyContent={"end"} alignItems={'top'}>
        <Button
          variant={"ghost"}
          onClick={toggleColorMode}
          _hover="none"
          _active="none"
        >
          <Image src={colorMode !== "light" ? moonIcon : sunIcon} />
        </Button>
        </Flex>
        
        {/* TODO: fix for mobile */}
        <Box w="40%" p="4em 0" m="auto">
          <Header />
          <InputButton
            colorMode={colorMode}
            todo={todo}
            setTodo={setTodo}
            addTodo={handleAddTodo}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
