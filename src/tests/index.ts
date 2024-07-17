import { StorageKeys } from "../services/LocalStorageService";

export enum TestId {
    Checkbox = "Checkbox",
    InputButton = "InputButton",
    ButtonAdd = "ButtonAdd",
    StatusBarClear = "StatusBarClear", 
    Todoitem = "Todoitem",
    TodoItemDelete = "TodoItemDelete"
}

export const cleanup = () => {
    localStorage.removeItem(StorageKeys.TODOS);
};