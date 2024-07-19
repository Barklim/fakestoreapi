import initListDb from "../../config/db.json";
import { v4 } from "uuid";

const list = initListDb.data?.list || [];

export const initList = list.map(
  (item: { username: string; email: string; phone: string; isFavorite: boolean, }) => ({
    id: v4(),
    username: item.username,
    email: item.email,
    phone: item.phone,
    isFavorite: item.isFavorite,
  })
);
