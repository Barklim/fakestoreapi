import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface StatusBarProps {
  itemLeft: number;
  handleClearAllClick: () => Promise<void>;
  handleAllClick: () => Promise<void>;
  handleActiveClick: () => Promise<void>;
  handleCompletedClick: () => Promise<void>;
}

export const StatusBar = ({
  itemLeft,
  handleClearAllClick,
  handleAllClick,
  handleActiveClick,
  handleCompletedClick,
}: StatusBarProps) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { colorMode, } = useColorMode();

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
    <Box fontWeight={"700"} color={"grey"}>
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
              onClick={handleAllClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              All
            </Text>
            <Text
              onClick={handleActiveClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              Active
            </Text>
            <Text
              onClick={handleCompletedClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
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
              onClick={handleAllClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              All
            </Text>
            <Text
              onClick={handleActiveClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              Active
            </Text>
            <Text
              onClick={handleCompletedClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              Completed
            </Text>
          </Flex>
          <Text
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
