import { Box, useColorMode, Flex, Text } from "@chakra-ui/react";
import Header from "./Header";
import lightBgImage from "../assets/bg_desktop_light.png";
import darkBgImage from "../assets/bg_desktop_dark.png";
import UserList from "./UserList";
import { StatusBar } from "./StatusBar";
import ThemeSwithcer from "./ThemeSwither";
import InputSection from "./InputSection";
import { useListState } from "../app/lib/useListHook";
import { StorageKeys } from "../services/LocalStorageService";
import { useEffect } from "react";
import { USER_LIST_DRAGGABLE_STATE, USER_LIST_EDITABLE_STATE } from "../config";
import { darkBg } from "../app/styles/const";

interface PageProps {
  initState?: boolean;
}
const Page: React.FC<PageProps> = ({ initState = false }) => {
  const { colorMode } = useColorMode();
  const {
    item,
    setItem,
    setItems,
    items,
    itemLeft,
    itemsLoaded,
    addNewItem,
    handleFavoriteItem,
    handleDeleteItem,
    handleReset,
    handleClearAllClick,
    handleAddItem,
    currentTab,
    handleTabClick,
    isEditable,
    setEditable,
    isDraggable,
    setDraggable,
  } = useListState(initState);

  const editableFeatureLS = localStorage.getItem(
    StorageKeys.USER_LIST_EDITABLE
  );
  const draggalbeFeatureLS = localStorage.getItem(
    StorageKeys.USER_LIST_DRAGGABLE
  );
  const usersListLS = localStorage.getItem(StorageKeys.USER_LIST);
  const parsedUsersListLS = usersListLS ? JSON.parse(usersListLS) : [];

  useEffect(() => {
    editableFeatureLS === null
      ? localStorage.setItem(
          StorageKeys.USER_LIST_EDITABLE,
          String(USER_LIST_EDITABLE_STATE)
        )
      : null;
    draggalbeFeatureLS === null
      ? localStorage.setItem(
          StorageKeys.USER_LIST_DRAGGABLE,
          String(USER_LIST_DRAGGABLE_STATE)
        )
      : null;
  }, [editableFeatureLS, draggalbeFeatureLS]);

  return (
    <>
      <Box
        backgroundImage={colorMode !== "light" ? lightBgImage : darkBgImage}
        backgroundSize={"cover"}
        content={"center"}
        h={"40vh"}
        w={"100%"}
        p={0}
      >
        <ThemeSwithcer />
        <Box w={{ base: "80%", md: "60%", lg: "40%" }} p="0 0" m="auto">
          <Header />
          <InputSection
            addNewItem={addNewItem}
            item={item}
            setItem={setItem}
            handleAddItem={handleAddItem}
            handleReset={handleReset}
            isEditable={isEditable}
            setEditable={setEditable}
            isDraggable={isDraggable}
            setDraggable={setDraggable}
          />
        </Box>
      </Box>

      <Box
        h={"60vh"}
        backgroundSize={"cover"}
        background={"#242424"}
        position={"relative"}
      >
        <Box minW={"100%"} m={"auto"} position={"absolute"} top={"-74"}>
          <Box w={{ base: "80%", md: "60%", lg: "40%" }} m={"auto"}>
            <Box
              maxH={"50vh"}
              overflowY={"auto"}
              borderTopRadius={"10px"}
              borderBottomRadius={
                isEditable && parsedUsersListLS.length > 0 ? 0 : "10px"
              }
              backgroundColor={colorMode === "light" ? "white" : darkBg}
            >
              <UserList
                items={items}
                handleFavoriteItem={handleFavoriteItem}
                handleDeleteItem={handleDeleteItem}
                setItems={setItems}
                itemsLoaded={itemsLoaded}
                isEditable={isEditable}
                isDraggable={isDraggable}
              />
            </Box>
            {isEditable && parsedUsersListLS.length > 0 && (
              <StatusBar
                itemLeft={itemLeft}
                handleClearAllClick={handleClearAllClick}
                currentTab={currentTab}
                handleTabClick={handleTabClick}
              />
            )}
          </Box>
          {isDraggable && parsedUsersListLS.length > 1 && (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              color={"grey"}
              fontWeight={"700"}
              fontSize={"large"}
              mt={"10"}
            >
              <Text userSelect={"none"}>Drag & drop to reorder list</Text>
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Page;
