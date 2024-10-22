import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getUsers() {
  try {
    const url = `${BASE_URL}/users`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getCurrentUser(id) {
  try {
    const url = `${BASE_URL}/users/${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function editSingleUser(id) {
  try {
    const url = `${BASE_URL}/users/${id}`;
    const response = await axios.put(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function login(body, config) {
  try {
    const url = `${BASE_URL}/users/login`;
    const response = await axios.post(url, body, config);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function register(body, config) {
  try {
    const url = `${BASE_URL}/users/register`;
    const response = await axios.post(url, body, config);
    return response;
  } catch (err) {
    return err.response;
  }
}
