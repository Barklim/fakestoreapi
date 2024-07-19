import axios from "axios";
import { API_URL, getApiUrl } from "../config";
import { User, UsersResponse } from "./User.dto";
import { ListService } from "./UserService";
import { initList } from "../app/lib/initList";

const url = getApiUrl()

class ApiService implements ListService {
  async fetchList(): Promise<User[]> {
    const { data } = await axios.get<UsersResponse>(`${url}/data`);
    return data.users as User[];
  }

  async addItem(user: User): Promise<void> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    const newData: User[] = [user, ...users];
    await axios.post(`${API_URL}/data`, { users: newData });
  }

  initList = async (): Promise<User[]> => {
    const users = initList;
    return await axios.post(`${API_URL}/data`, { users: users });
  };

  async isItemFavorite(id: string): Promise<boolean | undefined> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    const user = users.find((user) => user.id === id);
    return user?.isFavorite;
  }

  async markItemFavorite(id: string): Promise<void> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    users.forEach((user) => {
      if (user.id === id) user.isFavorite = !user.isFavorite;
    });
    await axios.post(`${API_URL}/data`, { users });
  }

  async deleteItem(id: string): Promise<void> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    const updatedData = users.filter((user) => user.id !== id);
    await axios.post(`${API_URL}/data`, { users: updatedData });
  }

  async countUnfavoriteItem(): Promise<number> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    return users.filter((user) => !user.isFavorite).length;
  }

  async clearAllFavoriteList(): Promise<void> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    const updatedData = users.filter((user) => !user.isFavorite);
    await axios.put(`${API_URL}/data`, { users: updatedData });
  }

  async getActiveItems(): Promise<User[]> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    return users.filter((user) => !user.isFavorite);
  }

  async getFavoriteItems(): Promise<User[]> {
    const { data } = await axios.get<UsersResponse>(`${API_URL}/data`);
    const users: User[] = data.users as User[];
    return users.filter((user) => user.isFavorite);
  }

  async updateReOrderedItems(users: User[]): Promise<void> {
    await axios.put(`${API_URL}/data`, { users });
  }
}

export default ApiService;
