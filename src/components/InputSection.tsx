import React, { KeyboardEvent } from "react";
import {
  Flex,
  Button,
  Box,
  useColorMode,
  SystemStyleObject,
} from "@chakra-ui/react";
import InputButton from "./InputButton";
import { TestId } from "../tests";

interface InputSectionProps {
  addNewItem: () => void;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  addNewItem,
  item,
  setItem,
  handleAddItem,
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
        <InputButton item={item} setItem={setItem} addItem={handleAddItem} />
        <Button
          data-testid={TestId.ButtonAdd}
          background={colorMode === "light" ? "white" : "#1a202c"}
          h={"3.5em"}
          w={"6em"}
          onClick={addNewItem}
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
