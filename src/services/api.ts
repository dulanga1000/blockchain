import axios from "axios";

const API = "https://blockchain-backend-t85y.onrender.com"; // change after deploy

export const getChain = () => axios.get(`${API}/chain`);

export const addBlock = (data: string) =>
  axios.post(`${API}/add`, { data });

export const validateChain = () =>
  axios.get(`${API}/validate`);