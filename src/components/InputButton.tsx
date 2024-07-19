import { FC } from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import arrowDownIcon from "../assets/arrow-down.svg";
import { TestId } from "../tests";
import { darkBg } from "../app/styles/const";

interface InputButtonProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  addItem: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputButton: FC<InputButtonProps> = ({ item, setItem, addItem }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      m="1.2em 0"
      background={colorMode === "light" ? "white" : darkBg}
      p="0.1em 0.1em 0.1em 0.6em"
      borderRadius={"0.5em"}
      w="100%"
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
          data-testid={TestId.InputButton}
          fontWeight={"200"}
          fontSize={"1.2em"}
          type="text"
          h="2.8em"
          w="100%"
          variant={"unstyled"}
          placeholder="What needs to be done?"
          ml={".5em"}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={addItem}
        />
      </InputGroup>
    </Flex>
  );
};

export default InputButton;
