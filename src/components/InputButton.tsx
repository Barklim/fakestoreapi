import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import Checkbox from "./Checkbox";

interface InputButtonProps {
  colorMode: "light" | "dark";
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputButton = ({
  colorMode = "dark",
  todo,
  setTodo,
  addTodo,
}: InputButtonProps) => {
  return (
    <Flex
      m="1.2em 0"
      background={colorMode === "light" ? "white" : "#1a202c"}
      p="0.1em 0.1em 0.1em 0.6em"
      borderRadius={"0.5em"}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents={"none"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
        >
          <Checkbox width={"22px"} height={"22px"} />
        </InputLeftElement>
        <Input
          fontWeight={"200"}
          fontSize={"1.2em"}
          type="text"
          h="2.8em"
          variant={"unstyled"}
          placeholder="What needs to be done?"
          ml={".5em"}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={addTodo}
        />
      </InputGroup>
    </Flex>
  );
};

export default InputButton;
