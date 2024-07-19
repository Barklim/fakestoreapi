import React, { KeyboardEvent } from "react";
import {
  Flex,
  Button,
  Box,
  Text,
  Image,
  useColorMode,
  SystemStyleObject,
} from "@chakra-ui/react";
import InputButton from "./InputButton";
import Checkbox from "./Checkbox";
import { TestId } from "../tests";

import checkIcon from "../assets/icon-check.svg";
import { darkBg } from "../app/styles/const";

interface InputSectionProps {
  addNewItem: () => void;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleReset: (callback: () => void) => void;
  isEditable: boolean;
  setEditable: () => void;
  isDraggable: boolean;
  setDraggable: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  addNewItem,
  item,
  setItem,
  handleAddItem,
  handleReset,
  isEditable,
  setEditable,
  isDraggable,
  setDraggable,
}) => {
  const { colorMode } = useColorMode();

  const reset = async () => {
    const log = () => console.log("reset");
    handleReset(log);
  };

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
          background={colorMode === "light" ? "white" : darkBg}
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
      <Flex
        justifyContent={"space-between"}
        gap={"1em"}
        alignItems={"center"}
        w={"100%"}
      >
        <Flex gap={'1em'}>
          <Flex
            align={"center"}
            background={colorMode === "light" ? "white" : darkBg}
            padding={"1.1em"}
            gap={"1.1em"}
            borderRadius={6}
          >
            <Box cursor={"pointer"} onClick={setEditable}>
              {isEditable ? (
                <Flex
                  w="24px"
                  h="24px"
                  borderRadius={"50%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  background={"green"}
                >
                  <Image src={checkIcon} />
                </Flex>
              ) : (
                <Checkbox width={"22px"} height={"22px"} />
              )}
            </Box>
            <Text cursor={"pointer"} userSelect={"none"}>
              Editable
            </Text>
          </Flex>

          <Flex
            align={"center"}
            background={colorMode === "light" ? "white" : darkBg}
            padding={"1.1em"}
            gap={"1.1em"}
            borderRadius={6}
          >
            <Box cursor={"pointer"} onClick={setDraggable}>
              {isDraggable ? (
                <Flex
                  w="24px"
                  h="24px"
                  borderRadius={"50%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  background={"green"}
                >
                  <Image src={checkIcon} />
                </Flex>
              ) : (
                <Checkbox width={"22px"} height={"22px"} />
              )}
            </Box>
            <Text cursor={"pointer"} userSelect={"none"}>
              Draggable
            </Text>
          </Flex>
        </Flex>

        <Button
          data-testid={TestId.ButtonAdd}
          background={colorMode === "light" ? "white" : darkBg}
          h={"3.5em"}
          w={"6em"}
          onClick={reset}
          _hover={
            colorMode === "light" ? undefined : ("none" as SystemStyleObject)
          }
        >
          RESET
        </Button>
      </Flex>
    </Box>
  );
};

export default InputSection;
