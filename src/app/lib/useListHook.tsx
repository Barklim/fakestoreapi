import { useEffect, useState } from "react";
import { v4 } from "uuid";
import service from "../../services";
import { User } from "../../services/User.dto";
import { StorageKeys } from "../../services/LocalStorageService";
import {
  USER_LIST_EDITABLE_STATE,
  USER_LIST_DRAGGABLE_STATE,
  USER_LIST_ADDABLE_STATE,
  USER_LIST_VIEW_STATE,
} from "../../config";

const getInitialState = (key: string, defaultValue: boolean) => {
  const state = localStorage.getItem(key);
  if (state === null) {
    localStorage.setItem(key, String(defaultValue));
    return defaultValue;
  }
  return state === "true";
};

export const useListState = (initState: boolean) => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState<User[]>([]);
  const [itemLeft, setItemLeft] = useState<number>(0);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<"all" | "active" | "favorite">("all");
  const [isEditable, setEditableState] = useState(
    getInitialState(StorageKeys.USER_LIST_EDITABLE, USER_LIST_EDITABLE_STATE)
  );
  const [isDraggable, setDraggableState] = useState(
    getInitialState(StorageKeys.USER_LIST_DRAGGABLE, USER_LIST_DRAGGABLE_STATE)
  );
  const [isAddable, setAddableState] = useState(
    getInitialState(StorageKeys.USER_LIST_ADDABLE, USER_LIST_ADDABLE_STATE)
  );
  const [isView, setViewState] = useState(
    getInitialState(StorageKeys.USER_LIST_VIEW, USER_LIST_VIEW_STATE)
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

  const toggleState = (state: boolean, setState: (value: boolean) => void, key: string) => {
    const newState = !state;
    setState(newState);
    localStorage.setItem(key, String(newState));

    if (key === StorageKeys.USER_LIST_EDITABLE) {
      handleTabClick("all")
    }
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
    setEditable: () => toggleState(isEditable, setEditableState, StorageKeys.USER_LIST_EDITABLE),
    isDraggable,
    setDraggable: () => toggleState(isDraggable, setDraggableState, StorageKeys.USER_LIST_DRAGGABLE),
    isAddable,
    setAddable: () => toggleState(isAddable, setAddableState, StorageKeys.USER_LIST_ADDABLE),
    isView,
    setViewState: () => toggleState(isView, setViewState, StorageKeys.USER_LIST_VIEW),
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
