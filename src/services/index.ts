import { USE_API } from "../config";
import { ListService } from "./UserService";
import ApiService from "./ApiService";
import LocalStorageService from "./LocalStorageService";

const service: ListService = USE_API ? new ApiService() : new LocalStorageService();
export default service;