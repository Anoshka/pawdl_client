import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5050";

function Chat({ token }) {
  const id = localStorage.getItem("SavedId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  const testobj = {
    FromUserId: 1,
    ToUserId: 2,
    Message: "hi there",
  };
  useEffect(() => {
    if (token) {
      const socketConnect = io(BASE_URL, {
        auth: { token: token },
      });
      setSocket(socketConnect);
      socketConnect.emit("authenticate", token);
      console.log("token ", token);
      setIsLoggedIn(true);
      socketConnect.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socketConnect.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socketConnect.on("receiveMessage", (data) => {
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
      setMessage("");
      //api call
    } else if (!isLoggedIn) {
      alert("You must be logged in to send messages.");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user}: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button onClick={sendMessage}>Send</button>
      {!isLoggedIn && <p>Please log in to send messages.</p>}
    </div>
  );
}

export default Chat;
