const PROD_API_URL = 'https://todo-list-json-server-hnyxyyqsa-klim-barks-projects.vercel.app';
const DEV_API_URL = 'http://localhost:3000';

export const USE_API = true;

export const API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;

export const getApiUrl = () => API_URL;