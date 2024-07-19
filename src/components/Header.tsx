import { Box, Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"top"}>
      <Box
        borderRadius="xl"
        paddingLeft={5}
        paddingRight={5}
        paddingBottom={1}
        backgroundColor={"rgba(26, 32, 44, 0.3)"}
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
