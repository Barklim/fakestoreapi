import { StorageKeys } from "../services/LocalStorageService";

export enum TestId {
    Checkbox = "Checkbox",
    InputButton = "InputButton",
    ButtonAdd = "ButtonAdd",
    StatusBarClear = "StatusBarClear", 
    Item = "Item",
    ItemDelete = "ItemDelete"
}

export const cleanup = () => {
    localStorage.removeItem(StorageKeys.USER_LIST);
};