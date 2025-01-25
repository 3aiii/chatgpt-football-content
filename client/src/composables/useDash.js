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

export const sumOfData = async () => {
  const response = await get(`/dashboard/sum-of-data`);

  return response.data;
};

export const UserLogData = async (page, pageSize) => {
  const response = await get(`dashboard/user-log-data`, {
    page,
    pageSize,
  });

  return response.data;
};
