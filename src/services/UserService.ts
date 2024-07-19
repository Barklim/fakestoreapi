import { User } from "./User.dto";

export interface ListService {
  fetchList: () => Promise<User[]>;
  addItem: (user: User) => Promise<void>;
  initList: () => Promise<User[]>;
  isItemFavorite: (id: string) => Promise<boolean | undefined>;
  markItemFavorite: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  reset: (callback: () => void) => void;
  countUnfavoriteItem: () => Promise<number>;
  clearAllFavoriteList: () => Promise<void>;
  getActiveItems: () => Promise<User[]>;
  getFavoriteItems: () => Promise<User[]>;
  updateReOrderedItems: (users: User[]) => Promise<void>;
}
