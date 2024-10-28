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
  if (!token) {
    token = localStorage.getItem("SavedToken");
  }
  const id = localStorage.getItem("SavedId");
  const friendId = useParams()["friendId"];
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [friend, setFriend] = useState({});
  const [socket, setSocket] = useState(null);
  const textareaRef = useRef(null);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
    return response.data;
  };

  const fetchFriend = async () => {
    const response = await getCurrentUser(friendId);
    setFriend(response.data);
    return response.data;
  };

  const fetchChat = async () => {
    const response = await getChat(id, friendId);

    setMessages(response.data);
    return response.data;
  };

  const postChat = async (body) => {
    const response = await saveChat(body, id, friendId);
    return response.data;
  };
  const chatRef = useRef(null);
  useEffect(() => {
    if (token) {
      fetchUser();
      fetchFriend();
      fetchChat();

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
        setMessages((prevMessages) => {
          return [...prevMessages, data];
        });
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
    const msg_data = {
      sender_id: id,
      sender_name: user["user_name"],
      receiver_id: friendId,
      receiver_name: friend["user_name"],
      message: message,
    };
    if (message && isLoggedIn) {
      socket.emit(
        "sendMessage",
        "",
        msg_data.sender_id,
        msg_data.sender_name,
        msg_data.receiver_id,
        msg_data.receiver_name,
        msg_data.message
      );
      setMessage("");
      postChat(msg_data);
      textareaRef.current.style.height = "auto";
    } else if (!isLoggedIn) {
      alert("You must be logged in to send messages.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Link className="chat__back" to={"/friends"}>
          <img src={arrow} className="chat__arrow" alt="go back" />
        </Link>
        <h2 className="chat__friend">{friend.user_name}</h2>
      </div>
      <div className="chat__messages" ref={chatRef}>
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat__text">
              <p className="chat__name">{msg.sender_name}:</p>
              <p className="chat__message" style={{ whiteSpace: "pre-wrap" }}>
                {msg.message}
              </p>
            </div>
          );
        })}
      </div>
      <textarea
        ref={textareaRef}
        className="chat__input"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        rows={1}
        placeholder="Type your message here..."
        style={{ overflow: "hidden" }}
      />
      <AiOutlineSend className="chat__send" onClick={() => sendMessage()} />
      {!isLoggedIn && <p>Please log in to send messages.</p>}
    </div>
  );
}

export default Chat;
