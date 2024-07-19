import { FC, useEffect, useState } from "react";
import { Flex, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import Checkbox from "./Checkbox";
import service from "../services";
import { User } from "../services/User.dto";
import { TestId } from "../tests";

import checkIcon from "../assets/icon-check.svg";
import { darkBg } from "../app/styles/const";

interface ListItemProps {
  item: User;
  handleFavoriteItem: (id: string) => Promise<void>;
  handleDeleteItem: (id: string) => Promise<void>;
  isDragDisabled: boolean;
  index: number;
}

const ListItem: FC<ListItemProps> = ({
  item,
  handleFavoriteItem,
  handleDeleteItem,
  isDragDisabled,
  index,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();
  const { isItemFavorite } = service;

  const handleClick = async (id: string) => {
    await handleFavoriteItem(id);
    setIsFavorite((await isItemFavorite(id)) || false);
  };

  useEffect(() => {
    isItemFavorite(item.id).then((data) => {
      setIsFavorite(data || false);
    });
  }, [item.id]);

  return (
    <Draggable
      draggableId={item.id}
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
            background={colorMode === "light" ? "white" : darkBg}
          >
            <Flex alignItems={"center"} minW={"100%"}>
              <Box cursor={"pointer"} onClick={() => handleClick(item.id)}>
                {isFavorite ? (
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
                  data-testid={TestId.Item}
                  fontWeight={"700"}
                  fontSize={"1.2rem"}
                  textDecoration={isFavorite ? "line-through" : "none"}
                  color={
                    isFavorite
                      ? "grey"
                      : colorMode === "light"
                        ? "black"
                        : "white"
                  }
                >
                  {item.title}
                </Text>
                {isVisible && (
                  <Box
                    data-testid={TestId.ItemDelete}
                    cursor="pointer"
                    onClick={() => handleDeleteItem(item.id)}
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

export default ListItem;
