import { Box } from "@chakra-ui/react";

interface CheckboxProps {
  width: string | number;
  height: string | number;
}

const Checkbox = ({ width = "100px", height = "100px" }: CheckboxProps) => {
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