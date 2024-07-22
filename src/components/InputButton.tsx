import { FC, useCallback } from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import arrowDownIcon from "../assets/arrow-down.svg";
import searchIcon from "../assets/search.svg";
import { TestId } from "../tests";
import { darkBg } from "../app/styles/const";
import { useDebounce } from "../app/lib/useDebounce";

interface InputButtonProps {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  addItem: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isSearch: boolean;
  searchUsers: (q: string) => void;
}

const InputButton: FC<InputButtonProps> = ({ setItem, addItem, isSearch, searchUsers }) => {
  const { colorMode } = useColorMode();

  const fetchData = useCallback((value: string) => {
    searchUsers(value)
  }, [searchUsers]);
  const debouncedFetchData = useDebounce(fetchData, 400, false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isSearch) {
      debouncedFetchData(value);
    } else {
      setItem(value);
    }
  };

  return (
    <Flex
      background={colorMode === "light" ? "white" : darkBg}
      p="0.1em 0.1em 0.1em 0.6em"
      borderRadius={"0.5em"}
      w="100%"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents={"none"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
        >
          <Image src={isSearch ? searchIcon : arrowDownIcon} opacity={colorMode === 'light' ? 0.8 : 0.3} />
        </InputLeftElement>
        <Input
          data-testid={TestId.InputButton}
          fontWeight={"200"}
          fontSize={"1.2em"}
          type="text"
          h="2.8em"
          w="100%"
          variant={"unstyled"}
          userSelect={'none'}
          placeholder={isSearch ? 'Search...' : 'Who needs to be add ?'}
          ml={".5em"}
          // value={item}
          onChange={handleChange}
          onKeyDown={addItem}
          
        />
      </InputGroup>
    </Flex>
  );
};

export default InputButton;
