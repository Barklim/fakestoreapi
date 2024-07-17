import { USE_API } from "../config";
import { TodoService } from "./TodoService";
import ApiService from "./ApiService";
import LocalStorageService from "./LocalStorageService";

const service: TodoService = USE_API ? new ApiService() : new LocalStorageService();
export default service;