import { Button, Image, Flex, useColorMode, SystemStyleObject } from "@chakra-ui/react";
import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

const ThemeSwithcer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent="end" alignItems="top">
      <Button
        variant="ghost"
        onClick={toggleColorMode}
        _hover={"none" as SystemStyleObject}
        _active={"none" as SystemStyleObject}
      >
        <Image src={colorMode !== "light" ? moonIcon : sunIcon} />
      </Button>
    </Flex>
  );
};

export default ThemeSwithcer;
