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
  const [currentTab, setCurrentTab] = useState<"all" | "active" | "favorite">("all");
  const [isEditable, setEditableState] = useState(localStorage.getItem(StorageKeys.USER_LIST_EDITABLE) === 'true');
  const [isDraggable, setDraggableState] = useState(localStorage.getItem(StorageKeys.USER_LIST_DRAGGABLE) === 'true');

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
    countUnfavoriteItem().then((count) => setItemLeft(count));
  }, [items]);

  useEffect(() => {
    fetchList().then((data) => {
      if (!data || (data.length === 0 && initState)) {
        initList().then(() => {
          fetchList().then((updatedItems) => {
            setItems(updatedItems);
            setItemsLoaded(true);
          });
        });
      } else {
        setItems(data);
        setItemsLoaded(true);
      }
    });
  }, []);

  const addNewItem = async () => {
    if (item) {
      const newItem = {
        id: v4(),
        title: item,
        isFavorite: false,
      };

      await addItem(newItem);
      setItems(await fetchList());
      setItem("");
    }
  };

  const setEditable = () => {
    if (isEditable) {
      setEditableState(false)
      localStorage.setItem(StorageKeys.USER_LIST_EDITABLE, 'false')
      handleAllClick()
    } else {
      setEditableState(true)
      localStorage.setItem(StorageKeys.USER_LIST_EDITABLE, 'true')
    }
  };

  const setDraggable = () => {
    if (isDraggable) {
      setDraggableState(false)
      localStorage.setItem(StorageKeys.USER_LIST_DRAGGABLE, 'false')
    } else {
      setDraggableState(true)
      localStorage.setItem(StorageKeys.USER_LIST_DRAGGABLE, 'true')
    }
  };

  const handleFavoriteItem = async (id: string) => {
    await markItemFavorite(id);
    countUnfavoriteItem().then((count) => setItemLeft(count));
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
    setItems(await fetchList());
  };


  const handleReset = async (cb: () => void) => {
    await reset(cb);
    setItems(await fetchList());
  };

  const handleClearAllClick = async () => {
    await clearAllFavoriteList();
    fetchList().then((data) => setItems(data));
  };

  const handleAllClick = async () => {
    setCurrentTab("all");
    fetchList().then((data) => setItems(data));
  };

  const handleActiveClick = async () => {
    setCurrentTab("active");
    getActiveItems().then((items) => setItems(items));
  };

  const handleFavoriteClick = async () => {
    setCurrentTab("favorite");
    getFavoriteItems().then((items) => setItems(items));
  };

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
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
    handleFavoriteItem,
    handleDeleteItem,
    handleReset,
    handleClearAllClick,
    handleAllClick,
    handleActiveClick,
    handleFavoriteClick,
    handleAddItem,
    handleTabClick,
    isEditable,
    setEditable,
    isDraggable,
    setDraggable
  };
};
