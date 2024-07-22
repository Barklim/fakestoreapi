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
import { light, darkBg } from "../app/styles/const";
import { ToggleableOption } from "./ToggleableOption";
import { version } from "../config";

interface InputSectionProps {
  addNewItem: () => void;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  searchUsers: (q: string) => void;
  handleAddItem: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleReset: (callback: () => void) => void;
  isEditable: boolean;
  setEditable: () => void;
  isDraggable: boolean;
  setDraggable: () => void;
  isAddable: boolean;
  setAddable: () => void;
  isView: boolean;
  setViewState: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  addNewItem,
  item,
  setItem,
  searchUsers,
  handleAddItem,
  handleReset,
  isEditable,
  setEditable,
  isDraggable,
  setDraggable,
  isAddable,
  setAddable,
  isView,
  setViewState,
}) => {
  const { colorMode } = useColorMode();

  const reset = async () => {
    const log = () => console.log("reset");
    handleReset(log);
  };

  return (
    <Box m="auto" w="100%" gap={"300px"}>
      <Flex  align={'end'} h={0} justifyContent={'end'}>{`v ${version}`}</Flex>
      <Flex gap={"1em"} flexDirection={"column"}>
        <Flex
          justifyContent={"space-between"}
          gap={"1em"}
          alignItems={"center"}
          w={"100%"}
        >
          <InputButton
            item={item}
            setItem={setItem}
            addItem={handleAddItem}
            isSearch
            searchUsers={searchUsers}
          />
        </Flex>

        {isAddable && (
          <Flex
            justifyContent={"space-between"}
            gap={"1em"}
            alignItems={"center"}
            w={"100%"}
          >
            <InputButton
              item={item}
              setItem={setItem}
              addItem={handleAddItem}
              isSearch={false}
              searchUsers={searchUsers}
            />
            <Button
              data-testid={TestId.ButtonAdd}
              background={colorMode === light ? "white" : darkBg}
              h={"3.5em"}
              w={"6em"}
              onClick={addNewItem}
              _hover={
                colorMode === light ? undefined : ("none" as SystemStyleObject)
              }
            >
              Add
            </Button>
          </Flex>
        )}

        <Flex
          justifyContent={"space-between"}
          gap={"1em"}
          alignItems={"start"}
          w={"100%"}
        >
          <Flex gap={"1em"} flexWrap={"wrap"}>
            <ToggleableOption
              label="Editable"
              isActive={isEditable}
              onToggle={setEditable}
            />
            <ToggleableOption
              label="Draggable"
              isActive={isDraggable}
              onToggle={setDraggable}
            />
            <ToggleableOption
              label="Addable"
              isActive={isAddable}
              onToggle={setAddable}
            />
            <ToggleableOption
              label="Table"
              isActive={isView}
              onToggle={setViewState}
              disabled
            />
          </Flex>

          <Button
            data-testid={TestId.ButtonAdd}
            background={colorMode === light ? "white" : darkBg}
            h={"3.5em"}
            w={"6em"}
            onClick={reset}
            _hover={
              colorMode === light ? undefined : ("none" as SystemStyleObject)
            }
          >
            RESET
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default InputSection;
