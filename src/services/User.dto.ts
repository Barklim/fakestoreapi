export interface User {
  id: string;
  title: string;
  isFavorite: boolean;
}

export interface UsersResponse {
  users: User[] | PromiseLike<User[]>;
}
