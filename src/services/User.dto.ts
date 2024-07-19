export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  isFavorite: boolean;
}

export interface UsersResponse {
  users: User[] | PromiseLike<User[]>;
}
