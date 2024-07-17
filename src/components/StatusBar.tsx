import { FC, useEffect, useState } from "react";
import { Box, ColorMode, Flex, Text, useColorMode } from "@chakra-ui/react";
import { TestId } from "../tests";

interface StatusBarProps {
  itemLeft: number;
  handleClearAllClick: () => Promise<void>;
  handleTabClick: (tab: "all" | "active" | "completed") => void;
  currentTab: "all" | "active" | "completed";
}

const getTextColor = (
  isSelected: boolean,
  colorMode: ColorMode
): "grey" | "black" | "white" => {
  if (isSelected) {
    return colorMode === "light" ? "black" : "white";
  } else {
    return "grey";
  }
};

export const StatusBar: FC<StatusBarProps> = ({
  itemLeft,
  handleClearAllClick,
  handleTabClick,
  currentTab,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) setIsMobileView(true);
      else setIsMobileView(false);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box fontWeight={"700"} color={colorMode === "light" ? "black" : "white"}>
      {isMobileView ? (
        <Flex direction={"column"}>
          <Flex
            h={"3em"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={"1.2em"}
            backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
            borderBottomRadius={"10px"}
          >
            <Text>
              {itemLeft} {itemLeft > 1 ? "items" : "item"} left
            </Text>
            <Text
              data-testid={TestId.StatusBarClear}
              onClick={handleClearAllClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              Clear Completed
            </Text>
          </Flex>
          <Box h="2em" minW={"100%"} backgroundColor={"#242424"}></Box>
          <Flex
            h={"3em"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"10px"}
            backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
            gap={"1em"}
          >
            <Text
              onClick={() => handleTabClick("all")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "all", colorMode)}
            >
              All
            </Text>
            <Text
              onClick={() => handleTabClick("active")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "active", colorMode)}
            >
              Active
            </Text>
            <Text
              onClick={() => handleTabClick("completed")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "completed", colorMode)}
            >
              Completed
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex
          p={"1.2em"}
          w={"100%"}
          justifyContent={"space-between"}
          borderBottomRadius={"10px"}
          backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
        >
          <Text>
            {itemLeft} {itemLeft > 1 ? "items" : "item"} left
          </Text>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"10px"}
            backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
            gap={"1em"}
          >
            <Text
              onClick={() => handleTabClick("all")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "all", colorMode)}
            >
              All
            </Text>
            <Text
              onClick={() => handleTabClick("active")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "active", colorMode)}
            >
              Active
            </Text>
            <Text
              onClick={() => handleTabClick("completed")}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
              color={getTextColor(currentTab === "completed", colorMode)}
            >
              Completed
            </Text>
          </Flex>
          <Text
            data-testid={TestId.StatusBarClear}
            onClick={handleClearAllClick}
            cursor={"pointer"}
            _hover={{ color: colorMode === "light" ? "black" : "white" }}
          >
            Clear Completed
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default StatusBar;
