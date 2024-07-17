import { FC, useEffect, useState } from "react";
import { Flex, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import Checkbox from "./Checkbox";
import service from "../services";
import { Todo } from "../services/Todo.dto";
import { TestId } from "../tests";

import checkIcon from "../assets/icon-check.svg";

interface TodoItemProps {
  todo: Todo;
  handleCompletedTodo: (id: string) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
  isDragDisabled: boolean;
  index: number;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  handleCompletedTodo,
  handleDeleteTodo,
  isDragDisabled,
  index,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();
  const { isTodoCompleted } = service;

  const handleClick = async (id: string) => {
    await handleCompletedTodo(id);
    setIsCompleted((await isTodoCompleted(id)) || false);
  };

  useEffect(() => {
    isTodoCompleted(todo.id).then((data) => {
      setIsCompleted(data || false);
    });
  }, [todo.id]);

  return (
    <Draggable
      draggableId={todo.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex
            p="1.1em"
            h="4.4em"
            borderBottom="1px solid grey"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            background={colorMode === "light" ? "white" : "#1a202c"}
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
                  data-testid={TestId.Todoitem}
                  fontWeight={"700"}
                  fontSize={"1.2rem"}
                  textDecoration={isCompleted ? "line-through" : "none"}
                  color={
                    isCompleted
                      ? "grey"
                      : colorMode === "light"
                        ? "black"
                        : "white"
                  }
                >
                  {todo.title}
                </Text>
                {isVisible && (
                  <Box
                    data-testid={TestId.TodoItemDelete}
                    cursor="pointer"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <CloseIcon />
                  </Box>
                )}
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
