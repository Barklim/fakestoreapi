import { Box, Flex, Heading } from "@chakra-ui/react";
import { boxShadow } from "../app/styles/const";

const Header = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"top"}>
      <Box
        borderRadius="xl"
        paddingLeft={5}
        paddingRight={5}
        paddingBottom={1}
        backgroundColor={boxShadow}
      >
        <Heading
          as="h2"
          size="xl"
          color="white"
          letterSpacing={".2em"}
          fontWeight={"600"}
          userSelect={"none"}
          opacity={1}
          backdropBlur={0.5}
        >
          Users
        </Heading>
      </Box>
    </Flex>
  );
};

export default Header;
