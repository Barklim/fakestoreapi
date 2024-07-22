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
import { light, darkBg } from "../app/styles/const";

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
    currentTab,
    handleTabClick,
    isEditable,
    setEditable,
    isDraggable,
    setDraggable,
    isAddable,
    setAddable,
    isView,
    setViewState,
    searchUsers,
    handleFavoriteItem,
    handleDeleteItem,
    handleReset,
    handleClearAllClick,
    handleAddItem,
  } = useListState(initState);

  const usersListLS = localStorage.getItem(StorageKeys.USER_LIST);
  const parsedUsersListLS = usersListLS ? JSON.parse(usersListLS) : [];

  return (
    <>
      <Box
        backgroundImage={colorMode !== light ? lightBgImage : darkBgImage}
        backgroundSize={"cover"}
        content={"center"}
        h={"40vh"}
        w={"100%"}
        p={0}
      ></Box>

      <Box
        h={"60vh"}
        backgroundSize={"cover"}
        background={"#242424"}
        position={"relative"}
      >
        <Box position={"relative"} top={isAddable ? '-38vh' : '-28vh'}>
          <ThemeSwithcer />
          <Box
            w={{ base: "80%", md: "60%", lg: "50%" }}
            p="0 0"
            m="auto"
            marginBottom="1.4em"
          >
            <Flex gap={"1em"} flexDirection={"column"}>
              <Header />
              <InputSection
                addNewItem={addNewItem}
                item={item}
                setItem={setItem}
                searchUsers={searchUsers}
                handleAddItem={handleAddItem}
                handleReset={handleReset}
                isEditable={isEditable}
                setEditable={setEditable}
                isDraggable={isDraggable}
                setDraggable={setDraggable}
                isAddable={isAddable}
                setAddable={setAddable}
                isView={isView}
                setViewState={setViewState}
              />
            </Flex>
          </Box>

          <Box minW={"100%"} m={"auto"} position={"absolute"}>
            <Box w={{ base: "80%", md: "60%", lg: "50%" }} m={"auto"}>
              <Box
                maxH={"50vh"}
                overflowY={"auto"}
                borderTopRadius={"10px"}
                borderBottomRadius={
                  isEditable && parsedUsersListLS.length > 0 ? 0 : "10px"
                }
                backgroundColor={colorMode === light ? "white" : darkBg}
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
      </Box>
    </>
  );
};

export default Page;
