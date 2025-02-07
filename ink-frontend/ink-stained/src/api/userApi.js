import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../utils/constants';

export const fetchUserByUsername = async (username) => {
  const response = await axiosInstance.get(ENDPOINTS.USERS.SINGLE(username));
  return response.data;
};

export const updateUserProfile = async (username, profileData) => {
  const response = await axiosInstance.patch(ENDPOINTS.USERS.UPDATE_FIELD(username), profileData);
  return response.data;
};

export const fetchAllUsers = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await axiosInstance.get(`${ENDPOINTS.USERS.ALL}?${queryString}`);
  return response.data;
};

export const deleteUser = async (username) => {
  const response = await axiosInstance.delete(ENDPOINTS.USERS.DELETE(username));
  return response.data;
};
