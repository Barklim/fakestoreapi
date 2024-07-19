import {
  Button,
  Image,
  Flex,
  useColorMode,
  SystemStyleObject,
  Box,
} from "@chakra-ui/react";

import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

const ThemeSwithcer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent="end" alignItems="top" 
    paddingTop={2}
    paddingRight={2}
    >
      <Box
        borderRadius={100}
        paddingTop={2}
        paddingBottom={2}
        backgroundColor={"rgba(26, 32, 44, 0.3)"}
      >
        <Button
          variant="ghost"
          onClick={toggleColorMode}
          _hover={"none" as SystemStyleObject}
          _active={"none" as SystemStyleObject}
        >
          <Image src={colorMode !== "light" ? moonIcon : sunIcon} />
        </Button>
      </Box>
    </Flex>
  );
};

export default ThemeSwithcer;
