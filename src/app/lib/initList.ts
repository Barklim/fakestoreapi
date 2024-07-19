import initListDb from "../../config/db.json";
import { v4 } from "uuid";

const list = initListDb.data?.list || [];

export const initList = list.map(
  (item: { title: string; isFavorite: boolean }) => ({
    id: v4(),
    title: item.title,
    isFavorite: item.isFavorite,
  })
);
