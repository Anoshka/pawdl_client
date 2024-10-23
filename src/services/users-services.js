import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const authToken = {
  headers: {
    "x-auth-token": localStorage.getItem("SavedToken"),
  },
};
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
    //const response = await axios.get(url);
    const response = axios.get(url, {
      headers: {
        Authorization: `${localStorage.getItem("SavedToken")}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getUserPosts(id) {
  try {
    const url = `${BASE_URL}/users/${id}/posts`;
    //const response = await axios.get(url);
    const response = axios.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function editSingleUser(id) {
  try {
    const url = `${BASE_URL}/users/${id}`;
    const response = await axios.put(url, {
      headers: {
        Authorization: `${localStorage.getItem("SavedToken")}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function deleteUser(id) {
  try {
    const url = `${BASE_URL}/users/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `${localStorage.getItem("SavedToken")}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function login(body, config) {
  try {
    const url = `${BASE_URL}/users/login`;
    const response = await axios.post(url, body, config);
    console.log("loging response is ", response);
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