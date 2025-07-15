// import axios from 'axios';

// const BASE_URL = 'https://628bc23e7886bbbb37bec607.mockapi.io/task-management';

// // Fetch tasks
// export const getTasks = async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// };

// // Add a new task
// export const addTask = async (task) => {
//   const response = await axios.post(BASE_URL, task);
//   return response.data;
// };

// // Update an existing task
// export const updateTask = async (id, updatedTask) => {
//   const response = await axios.put(`${BASE_URL}/${id}`, updatedTask);
//   return response.data;
// };

// // Delete a task
// export const deleteTask = async (id) => {
//   const response = await axios.delete(`${BASE_URL}/${id}`);
//   return response.data;
// };

import axios from "axios";
import type { UserFormValues } from "../components/types";

const BASE_URL = "https://628bc23e7886bbbb37bec607.mockapi.io/task-management";
const LOGIN_URL =
  "https://67591fd360576a194d13245d.mockapi.io/task-management/task-management"; // Replace with your mock login API endpoint if available

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Set token in headers for all requests
const getAuthHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// User Login function (with mock JWT response)
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    // Here we're mocking the login API request. Replace this URL with your real login API.
    const response = await axios.post(LOGIN_URL, { username, password });

    // Assuming the response contains a JWT token
    const { token } = response.data;

    // Store the token in localStorage (or sessionStorage for session-only storage)
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Fetch tasks with authentication (using token in headers)
export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

// Add a new task with authentication
export const addTask = async (task: UserFormValues) => {
  try {
    const response = await axios.post(BASE_URL, task, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task", error);
    throw error;
  }
};

// Update an existing task with authentication
export const updateTask = async ({
  id,
  updatedTask,
}: {
  id: number;
  updatedTask: UserFormValues;
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedTask, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

// Delete a task with authentication
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};
