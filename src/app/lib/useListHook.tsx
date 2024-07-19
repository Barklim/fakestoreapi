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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<"all" | "active" | "favorite">("all");
  const [isEditable, setEditableState] = useState(
    localStorage.getItem(StorageKeys.USER_LIST_EDITABLE) === "true"
  );
  const [isDraggable, setDraggableState] = useState(
    localStorage.getItem(StorageKeys.USER_LIST_DRAGGABLE) === "true"
  );
  const [isAddable, setAddableState] = useState(
    localStorage.getItem(StorageKeys.USER_LIST_ADDABLE) === "true"
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
    handleTabClick("all")
  };

  const setDraggable = () => {
    const newState = !isDraggable;
    setDraggableState(newState);
    localStorage.setItem(StorageKeys.USER_LIST_DRAGGABLE, String(newState));
  };

  const setAddable = () => {
    const newState = !isAddable;
    setAddableState(newState);
    localStorage.setItem(StorageKeys.USER_LIST_ADDABLE, String(newState));
  };

  const search = (query: string): User[] => {
    const lowerCaseQuery = query.toLowerCase();
  
    const usersListLS = localStorage.getItem(StorageKeys.USER_LIST);
    const parsedUsersListLS: User[] = usersListLS ? JSON.parse(usersListLS) : [];
  
    return parsedUsersListLS.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phone.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const searchUsers = async (query: string): Promise<void> => {
    setSearchQuery(query);
    const itemsToFilter = await getItemsByTab(currentTab);
  
    if (query === "") {
      setItems(itemsToFilter);
      return;
    }
  
    const filteredBySearchItems = search(query);
    const filteredItems = itemsToFilter.filter(item =>
      filteredBySearchItems.some(filteredItem => filteredItem.id === item.id)
    );
    
    setItems(filteredItems);
  };

  const getItemsByTab = async (tab: "all" | "active" | "favorite"): Promise<User[]> => {
    switch (tab) {
      case "all":
        return await fetchList();
      case "active":
        return await getActiveItems();
      case "favorite":
        return await getFavoriteItems();
      default:
        return [];
    }
  };

  const handleTabClick = async (tab: "all" | "active" | "favorite") => {
    setCurrentTab(tab);
    const itemsToFilter = await getItemsByTab(tab);
    const filteredBySearchItems = search(searchQuery);
    const filteredItems = itemsToFilter.filter(item =>
      filteredBySearchItems.some(filteredItem => filteredItem.id === item.id)
    );
    setItems(filteredItems);
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

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewItem();
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
    isAddable,
    setAddable,
    searchUsers,
    handleFavoriteItem,
    handleDeleteItem,
    handleReset,
    handleClearAllClick,
    handleAllClick: () => handleTabClick("all"),
    handleActiveClick: () => handleTabClick("active"),
    handleFavoriteClick: () => handleTabClick("favorite"),
    handleAddItem,
    handleTabClick,
  };
};
