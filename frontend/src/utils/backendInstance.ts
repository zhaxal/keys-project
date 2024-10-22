import axios from "axios";

const host = import.meta.env.VITE_BACKEND_URL;
const backendInstance = axios.create({ baseURL: host });

export default backendInstance;