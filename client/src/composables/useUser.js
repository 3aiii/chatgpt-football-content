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

export const register = async (
  username,
  password,
  fname,
  lname,
  tel,
  email,
  role
) => {
  const response = await axios.post(`${HOST_URL}/user/register`, {
    username,
    password,
    fname,
    lname,
    tel,
    email,
    role,
  });

  return response.data;
};
export const login = async (username, password) => {
  const response = await axios.post(`${HOST_URL}/user/login`, {
    username,
    password,
  });

  return response.data;
};
export const logout = async (userId) => {
  const response = await axios.post(`${HOST_URL}/user/logout/${userId}`, null, {
    withCredentials: true,
  });

  return response.data;
};
export const update = async (userId, data) => {
  const response = await axios.put(
    `${HOST_URL}/user/${userId}`,
    {
      username: data?.username,
      password: data?.password,
      fname: data?.fname,
      lname: data?.lname,
      tel: data?.tel,
      email: data?.email,
      role: data?.role,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const fetch = async (userId) => {
  const response = await get(`user/${userId}`);

  return response.data;
};
export const fetchs = async (search, page, pageSize) => {
  const response = await get(`user/gets`, { search, page, pageSize });

  return response.data;
};
export const remove = async (userId) => {
  const response = await axios.delete(`${HOST_URL}/user/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};
