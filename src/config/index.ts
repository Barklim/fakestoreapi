const PROD_API_URL = 'https://todo-list-json-server-hnyxyyqsa-klim-barks-projects.vercel.app';
const DEV_API_URL = 'http://localhost:3000';
export const FAKESTORE_API_URL = 'https://fakestoreapi.com/users';

export const USE_API = false;

export const API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;

export const getApiUrl = () => API_URL;

export const version = '1.0.0'

export const INIT_LIST = true;

export const USER_LIST_EDITABLE_STATE = false;
export const USER_LIST_DRAGGABLE_STATE = true;
export const USER_LIST_ADDABLE_STATE = false;
export const USER_LIST_VIEW_STATE = true;