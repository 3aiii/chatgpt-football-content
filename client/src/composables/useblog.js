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

export const create = async (data) => {
  const response = await axios.post(`${HOST_URL}/blog/create`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const uploadImg = async (userId, file) => {
  const formData = new FormData();
  formData.append("upload", file);

  const response = await axios.post(
    `${HOST_URL}/blog/uploadImage/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const fetchs = async (search, page, pageSize) => {
  const response = await get(`blog/gets`, { search, page, pageSize });

  return response.data;
};
export const fetch = async (blogId) => {
  const response = await get(`blog/${blogId}`);

  return response.data;
};
export const update = async (data, blogId) => {
  const response = await axios.put(`${HOST_URL}/blog/${blogId}`, data, {
    withCredentials: true,
  });

  return response.data;
};
export const remove = async (blogId) => {
  const response = await axios.delete(`${HOST_URL}/blog/${blogId}`, {
    withCredentials: true,
  });

  return response.data;
};
