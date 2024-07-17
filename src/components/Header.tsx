import { Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex justifyContent={"center"} alignItems={'top'}>
      <Heading as="h2" size="xl" color="white" letterSpacing={".2em"} fontWeight={"200"}>
        todos
      </Heading>
    </Flex>
  );
};

export default Header;