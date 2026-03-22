import axios from "axios";

const API = "http://127.0.0.1:5000"; // change after deploy

export const getChain = () => axios.get(`${API}/chain`);

export const addBlock = (data: string) =>
  axios.post(`${API}/add`, { data });

export const validateChain = () =>
  axios.get(`${API}/validate`);