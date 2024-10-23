import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const authToken = {
  headers: {
    "x-auth-token": localStorage.getItem("SavedToken"),
  },
};
export async function getPosts() {
  try {
    const url = `${BASE_URL}/posts`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getPost(id) {
  try {
    const url = `${BASE_URL}/posts/${id}`;
    //const response = await axios.get(url);
    const response = axios.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function editPost(id) {
  try {
    const url = `${BASE_URL}/posts/${id}`;
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

export async function deletePost(id) {
  try {
    const url = `${BASE_URL}/posts/${id}`;
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
