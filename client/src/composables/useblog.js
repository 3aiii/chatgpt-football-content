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

export const recommand = async () => {
  const response = await get(`blog/recommend`);

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
export const createComment = async (blogId, userId, text) => {
  const response = await axios.post(
    `${HOST_URL}/blog/createComment/${blogId}`,
    { userId, text },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const getComment = async (blogId) => {
  const response = await get(`blog/comment/${blogId}`);

  return response.data;
};
export const ratings = async (data, blogId) => {
  const response = await axios.post(
    `${HOST_URL}/blog/rating/${blogId}`,
    {
      rating: data.rating,
      userId: data.userId,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const removeRating = async (data, blogId) => {
  const response = await axios.put(
    `${HOST_URL}/blog/rating/${blogId}`,
    {
      userId: data.userId,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const saveLog = async (message, userId) => {
  const response = await axios.post(
    `${HOST_URL}/system/save-log`,
    { message, userId },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
