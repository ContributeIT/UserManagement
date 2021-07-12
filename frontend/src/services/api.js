import axios from 'axios';

const api = axios.create({
  // baseURL: "http://192.168.58.218:8888",
  baseURL: "http://localhost:8000",

});

export default api;