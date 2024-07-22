import React from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import Checkbox from "./Checkbox";
import checkIcon from "../assets/icon-check.svg";
import { darkBg } from "../app/styles/const";

export const ToggleableOption: React.FC<{
    label: string;
    isActive: boolean;
    onToggle: () => void;
    disabled?: boolean;
  }> = ({ label, isActive, onToggle, disabled = false }) => {
    const { colorMode } = useColorMode();
    return (
      <Flex
        align={"center"}
        background={colorMode === "light" ? "white" : darkBg}
        padding={"1.1em"}
        gap={"1.1em"}
        borderRadius={6}
        opacity={disabled ? 0.5 : 1}
      >
        <Box cursor={"pointer"} onClick={!disabled ? onToggle : undefined} userSelect={'none'}>
          {isActive ? (
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
          {label}
          {disabled}
        </Text>
      </Flex>
    );
  };