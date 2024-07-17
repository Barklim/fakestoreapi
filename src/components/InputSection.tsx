import React, { KeyboardEvent } from "react";
import {
  Flex,
  Button,
  Box,
  useColorMode,
  SystemStyleObject,
} from "@chakra-ui/react";
import InputButton from "./InputButton";

interface InputSectionProps {
  addNewTodo: () => void;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  addNewTodo,
  todo,
  setTodo,
  handleAddTodo,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Box m="auto" w="100%">
      <Flex
        justifyContent={"space-between"}
        gap={"1em"}
        alignItems={"center"}
        w={"100%"}
      >
        <InputButton todo={todo} setTodo={setTodo} addTodo={handleAddTodo} />
        <Button
          background={colorMode === "light" ? "white" : "#1a202c"}
          h={"3.5em"}
          w={"6em"}
          onClick={addNewTodo}
          _hover={
            colorMode === "light" ? undefined : ("none" as SystemStyleObject)
          }
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default InputSection;
