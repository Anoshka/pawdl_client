import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getChats(id) {
  try {
    if (id) {
      const url = `${BASE_URL}/chat/${id}`;
      const response = await axios.get(url);
      return response;
    } else {
      console.log("no user id found");
    }
  } catch (err) {
    return err.response;
  }
}

export async function getChat(id, friendId) {
  try {
    if (id && friendId) {
      console.log(id);
      const url = `${BASE_URL}/chat/${id}/${friendId}`;
      const response = axios.get(url);
      return response;
    } else {
      console.log("no ids found");
    }
  } catch (err) {
    return err.response;
  }
}

export async function saveChat(body, id, friendId) {
  try {
    const url = `${BASE_URL}/chat/${id}/${friendId}`;
    const response = await axios.post(url, body);
    return response;
  } catch (err) {
    return err.response;
  }
}
