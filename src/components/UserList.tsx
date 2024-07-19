import { FC, Dispatch, SetStateAction } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Flex } from "@chakra-ui/react";
import { User } from "../services/User.dto";
import ListItem from "./ListItem";
import service from "../services";
import StrictModeDroppable from "./StrictModeDroppable";
import { v4 } from "uuid";

const reorder = (
  list: User[],
  startIndex: number,
  endIndex: number
): User[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface UserListProps {
  items: User[];
  handleFavoriteItem: (id: string) => Promise<void>;
  handleDeleteItem: (id: string) => Promise<void>;
  setItems: Dispatch<SetStateAction<User[]>>;
  itemsLoaded: boolean;
  isEditable: boolean;
}

const UserList: FC<UserListProps> = ({
  items,
  handleFavoriteItem,
  handleDeleteItem,
  setItems,
  itemsLoaded,
  isEditable
}) => {
  if (!itemsLoaded) {
    return <div>Loading...</div>;
  }

  const isDragDisabled = items.length === 1;
  const { updateReOrderedItems } = service;

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(updatedItems);
    await updateReOrderedItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId={v4()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.length > 0 &&
              items.map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  handleFavoriteItem={handleFavoriteItem}
                  handleDeleteItem={handleDeleteItem}
                  isDragDisabled={isDragDisabled}
                  isEditable={isEditable}
                  index={index}
                />
              ))}
            {items.length === 0 && (
              <Flex h={70} align={'center'} justifyContent={'center'} borderBottom={'1px solid grey'}><div>Nothing to show :(</div></Flex>
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default UserList;
