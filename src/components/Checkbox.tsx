import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { TestId } from "../tests";

interface CheckboxProps {
  width?: string | number;
  height?: string | number;
}

const Checkbox: FC<CheckboxProps> = ({ width = "100px", height = "100px" }) => {
  return (
    <Box
      data-testid={TestId.Checkbox}
      w={width}
      h={height}
      borderRadius={"50%"}
      border=".1em solid grey"
    ></Box>
  );
};

export default Checkbox;
