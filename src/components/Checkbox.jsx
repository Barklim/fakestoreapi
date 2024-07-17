import { Box } from "@chakra-ui/react";
const Checkbox = ({ width, height }) => {
  return (
    <Box
      w={width}
      h={height}
      borderRadius={"50%"}
      border=".1em solid grey"
    ></Box>
  );
};

export default Checkbox;