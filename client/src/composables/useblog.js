import { HOST_URL } from "../secret";
import axios from "./../../node_modules/axios/lib/axios";

const get = async (endpoint, params = {}) => {
  return await axios.get(`${HOST_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  });
};

export const create = async (name) => {
  const response = await axios.post(`${HOST_URL}/blog/create`, name);

  return response.data;
};
export const fetchs = async (page, pageSize) => {
  const response = await get(`blog/gets`, { page, pageSize });

  return response.data;
};
export const fetch = async (cateId) => {
  const response = await get(`blog/${cateId}`);

  return response.data;
};
export const update = async (name, cateId) => {
  const response = await axios.put(`${HOST_URL}/blog/${cateId}`, name);

  return response.data;
};
export const remove = async (cateId) => {
  const response = await axios.delete(`${HOST_URL}/blog/${cateId}`);

  return response.data;
};
