import { useEffect, useState } from "react";
import { v4 } from "uuid";
import service from "../../services";
import { User } from "../../services/User.dto";
import { StorageKeys } from "../../services/LocalStorageService";

export const useListState = (initState: boolean) => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState<User[]>([]);
  const [itemLeft, setItemLeft] = useState<number>(0);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [currentTab, setCurrentTab] = useState<"all" | "active" | "favorite">(
    "all"
  );
  const [isEditable, setEditableState] = useState(
    localStorage.getItem(StorageKeys.USER_LIST_EDITABLE) === "true"
  );
  const [isDraggable, setDraggableState] = useState(
    localStorage.getItem(StorageKeys.USER_LIST_DRAGGABLE) === "true"
  );

  const {
    addItem,
    initList,
    clearAllFavoriteList,
    countUnfavoriteItem,
    deleteItem,
    reset,
    fetchList,
    getActiveItems,
    getFavoriteItems,
    markItemFavorite,
  } = service;

  useEffect(() => {
    const fetchUnfavoriteItemCount = async () => {
      const count = await countUnfavoriteItem();
      setItemLeft(count);
    };
    fetchUnfavoriteItemCount();
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchList();
      if (!data || (data.length === 0 && initState)) {
        await initList();
        const updatedItems = await fetchList();
        setItems(updatedItems);
      } else {
        setItems(data);
      }
      setItemsLoaded(true);
    };
    fetchData();
  }, [initState, fetchList, initList]);

  const addNewItem = async () => {
    if (item) {
      const newItem: User = {
        id: v4(),
        username: item,
        email: "example@example.com",
        phone: "1-570-236-7033",
        isFavorite: false,
      };

      await addItem(newItem);
      const updatedItems = await fetchList();
      setItems(updatedItems);
      setItem("");
    }
  };

  const setEditable = () => {
    const newState = !isEditable;
    setEditableState(newState);
    localStorage.setItem(StorageKeys.USER_LIST_EDITABLE, String(newState));
    if (newState) {
      handleAllClick();
    }
  };

  const setDraggable = () => {
    const newState = !isDraggable;
    setDraggableState(newState);
    localStorage.setItem(StorageKeys.USER_LIST_DRAGGABLE, String(newState));
  };

  const searchUsers = (query: string): void => {
    const lowerCaseQuery = query.toLowerCase();

    const usersListLS = localStorage.getItem(StorageKeys.USER_LIST);
    const parsedUsersListLS: User[] = usersListLS ? JSON.parse(usersListLS) : [];

    const filteredUsers = parsedUsersListLS.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phone.toLowerCase().includes(lowerCaseQuery)
    );
    setItems(filteredUsers);
  };

  const handleFavoriteItem = async (id: string) => {
    await markItemFavorite(id);
    const count = await countUnfavoriteItem();
    setItemLeft(count);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
    const updatedItems = await fetchList();
    setItems(updatedItems);
  };

  const handleReset = async (cb: () => void) => {
    await reset(cb);
    const updatedItems = await fetchList();
    setItems(updatedItems);
  };

  const handleClearAllClick = async () => {
    await clearAllFavoriteList();
    const data = await fetchList();
    setItems(data);
  };

  const handleAllClick = async () => {
    setCurrentTab("all");
    const data = await fetchList();
    setItems(data);
  };

  const handleActiveClick = async () => {
    setCurrentTab("active");
    const activeItems = await getActiveItems();
    setItems(activeItems);
  };

  const handleFavoriteClick = async () => {
    setCurrentTab("favorite");
    const favoriteItems = await getFavoriteItems();
    setItems(favoriteItems);
  };

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };

  const handleTabClick = (tab: "all" | "active" | "favorite") => {
    switch (tab) {
      case "all":
        handleAllClick();
        break;
      case "active":
        handleActiveClick();
        break;
      case "favorite":
        handleFavoriteClick();
        break;
      default:
        break;
    }
  };

  return {
    item,
    setItem,
    setItems,
    items,
    itemLeft,
    itemsLoaded,
    currentTab,
    addNewItem,
    isEditable,
    setEditable,
    isDraggable,
    setDraggable,
    searchUsers,
    handleFavoriteItem,
    handleDeleteItem,
    handleReset,
    handleClearAllClick,
    handleAllClick,
    handleActiveClick,
    handleFavoriteClick,
    handleAddItem,
    handleTabClick,
  };
};
