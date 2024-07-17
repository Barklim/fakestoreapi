import { Flex, InputGroup, InputLeftElement, Input, Image, useColorMode } from "@chakra-ui/react";
import arrowDownIcon from "../assets/arrow-down.svg";

interface InputButtonProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputButton = ({
  todo,
  setTodo,
  addTodo,
}: InputButtonProps) => {
  const { colorMode, } = useColorMode();
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
          <Image src={arrowDownIcon} opacity={0.3} />
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
