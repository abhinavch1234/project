import axios from 'axios';


const API = axios.create({ baseURL: 'https://project-production.up.railway.app/api' });

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchTasks = () => API.get('/tasks');
