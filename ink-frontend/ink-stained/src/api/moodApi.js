import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../utils/constants';

// Fetch the current mood of a user
export const fetchCurrentMood = async (username) => {
  console.log(username)
  const response = await axiosInstance.get(ENDPOINTS.MOOD.CURRENT(username));
  return response.data;
};

// Update the current mood of a user
export const updateCurrentMood = async (username, mood, description) => {
  const response = await axiosInstance.post(ENDPOINTS.MOOD.SET_MOOD(username), {
    mood,
    description,
  });
  return response.data;
};

// Fetch mood history for a specific user
export const fetchMoodHistory = async (username) => {
  const response = await axiosInstance.get(ENDPOINTS.USERS.MOOD_HISTORY(username));
  return response.data;
};
