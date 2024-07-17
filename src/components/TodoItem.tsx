import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import checkIcon from "../assets/icon-check.svg";
import Checkbox from "./Checkbox";
import { isTodoCompleted } from "../actions";
import { Todo } from "../actions/Todo.dto";

interface TodoItemProps {
  colorMode: "light" | "dark";
  todo: Todo;
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
}

const TodoItem = ({
  todo,
  colorMode = "dark",
  handleCompletedTodo,
  handleDeleteTodo,
}: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = async (id: string) => {
    await handleCompletedTodo(id);
    setIsCompleted((await isTodoCompleted(id)) || false);
  };

  useEffect(() => {
    isTodoCompleted().then((data) => setIsCompleted(data || false));
  }, []);

  return (
    <Flex
      p="0.1em 1.1em 0.1em 1.1em"
      h="3.2em"
      borderBottom="1px solid grey"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Flex alignItems={"center"} minW={"100%"}>
        <Box cursor={"pointer"} onClick={() => handleClick(todo.id)}>
          {isCompleted ? (
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
        <Flex ml="1em" justifyContent={"space-between"} w="100%">
          <Text
            fontWeight={"200"}
            fontSize={"1.2rem"}
            textDecoration={isCompleted ? "line-through" : "none"}
            color={
              isCompleted ? "grey" : colorMode === "light" ? "black" : "white"
            }
          >
            {todo.title}
          </Text>
          {isVisible && (
            <Box cursor="pointer" onClick={() => handleDeleteTodo(todo.id)}>
              <CloseIcon />
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
