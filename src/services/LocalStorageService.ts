import { User } from "./User.dto";
import { ListService } from "./UserService";
import { FAKESTORE_API_URL } from "../config";
// import { initList } from "../app/lib/initList";

export enum StorageKeys {
  USER_LIST = 'user_list',
  USER_LIST_EDITABLE = 'user_list_editable',
  USER_LIST_DRAGGABLE = 'user_list_draggable',
  USER_LIST_ADDABLE = 'user_list_addable',
  USER_LIST_VIEW = 'user_list_view',
}

class LocalStorageService implements ListService {
  fetchList = async (): Promise<User[]> => {
    const users = localStorage.getItem(StorageKeys.USER_LIST);
    return users ? JSON.parse(users) : [];
  };

  addItem = async (user: User): Promise<void> => {
    const users = await this.fetchList();
    users.push(user);
    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(users));
  };

  initList = async (): Promise<User[]> => {
    const response = await fetch(FAKESTORE_API_URL);
    const data = await response.json();
    
    const users = data.slice(0, 9).map((user: any) => ({
      id: String(user.id),
      username: user.username,
      phone: user.phone,
      email: user.email,
    }));

    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(users));
    return users;
  };

  isItemFavorite = async (id: string): Promise<boolean | undefined> => {
    const users = await this.fetchList();
    const user = users.find((user) => user.id === id);
    return user?.isFavorite;
  };

  markItemFavorite = async (id: string): Promise<void> => {
    const users = await this.fetchList();
    const user = users.find((user) => user.id === id);
    if (user) {
      user.isFavorite = !user.isFavorite;
      localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(users));
    }
  };

  deleteItem = async (id: string): Promise<void> => {
    const users = await this.fetchList();
    const updatedData = users.filter((user) => user.id !== id);
    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(updatedData));
  };

  reset = async (cb: () => void): Promise<void> => {
    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify([]));
    await this.initList();
    cb()
  };

  countUnfavoriteItem = async (): Promise<number> => {
    const users = await this.fetchList();
    return users.filter((user) => !user.isFavorite).length;
  };

  clearAllFavoriteList = async (): Promise<void> => {
    const users = await this.fetchList();
    const updatedData = users.filter((user) => !user.isFavorite);
    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(updatedData));
  };

  getActiveItems = async (): Promise<User[]> => {
    const users = await this.fetchList();
    return users.filter((user) => !user.isFavorite);
  };

  getFavoriteItems = async (): Promise<User[]> => {
    const users = await this.fetchList();
    return users.filter((user) => user.isFavorite);
  };

  updateReOrderedItems = async (users: User[]): Promise<void> => {
    localStorage.setItem(StorageKeys.USER_LIST, JSON.stringify(users));
  };
}

export default LocalStorageService;