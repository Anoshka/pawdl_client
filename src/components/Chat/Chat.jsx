import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import { getCurrentUser } from "../../services/users-services";
import { getChat, saveChat } from "../../services/chat-services";
import { AiOutlineSend } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/arrow_back-mint-green-24px-svg.svg";
const BASE_URL = "http://localhost:5050";

function Chat({ token }) {
  console.log(" out token ", token);
  if (!token) {
    token = localStorage.getItem("SavedToken");
  }
  const id = localStorage.getItem("SavedId");
  const friendId = useParams()["friendId"];
  const [message, setMessage] = useState("");
  console.log("friend id is ", friendId);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);
  const textareaRef = useRef(null);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
    console.log("response is ", response.data);
    return response.data;
  };

  const fetchChat = async () => {
    const response = await getChat(id, friendId);
    console.log("chat so far is ", response);
    setMessages(response.data);
    console.log("response is ", response.data);
    return response.data;
  };

  const postChat = async (body) => {
    const response = await saveChat(body, id, friendId);
    console.log("messages submitted ", response);
    return response.data;
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchChat();

      console.log("token ", token);
      setIsLoggedIn(true);
      const socketConnect = io(BASE_URL, {
        auth: { token: token },
      });
      setSocket(socketConnect);
      socketConnect.emit("authenticate", token);

      socketConnect.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socketConnect.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socketConnect.on("receiveMessage", (data) => {
        console.log("data messages is ", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socketConnect.off("receiveMessage");
        socketConnect.disconnect();
      };
    } else {
      console.log("No token found, user is not logged in.");
    }
  }, [token]);

  const sendMessage = () => {
    if (message && isLoggedIn) {
      socket.emit("sendMessage", message);
      console.log("message is ", message);
      setMessage("");
      postChat({ sender_id: id, receiver_id: friendId, message: message });
      textareaRef.current.style.height = "auto"; // Reset height
    } else if (!isLoggedIn) {
      alert("You must be logged in to send messages.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return; // Allow new line
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    textareaRef.current.style.height = "auto"; // Reset height to auto to shrink if needed
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Link className="chat__back" to={"/friends"}>
          <img src={arrow} className="chat__arrow" alt="go back" />
        </Link>
      </div>
      <div className="chat__messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat__text">
            <p className="chat__name">{user.user_name}:</p>
            <p className="chat__message" style={{ whiteSpace: "pre-wrap" }}>
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="chat__input"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        rows={1} // Start with a single row
        placeholder="Type your message here..."
        style={{ overflow: "hidden" }} // Prevent scrollbars
      />
      <AiOutlineSend className="chat__send" onClick={() => sendMessage()} />
      {!isLoggedIn && <p>Please log in to send messages.</p>}
    </div>
  );
}

export default Chat;
