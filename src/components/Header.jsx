/* eslint-disable react/prop-types */
import { Flex, Heading, Button, Image } from "@chakra-ui/react";

import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

const Header = () => {
  return (
    <Flex justifyContent={"center"} alignItems={'top'}>
      <Heading as="h2" size="xl" color="white" letterSpacing={".2em"}>
        todos
      </Heading>
    </Flex>
  );
};

export default Header;