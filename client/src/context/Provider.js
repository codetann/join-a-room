import React, { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

const socket = io("/");

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function Provider({ children }) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(uuid());
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  function signIn(data) {
    /* resets the messages array when a user quits and signs in again */
    setMessages([]);
    /* sends room name, username, and id to the server */
    const { roomId, username } = data;
    socket.emit("sign-in", {
      roomId,
      username,
      userId,
    });
    setUsername(username);
    setRoomId(roomId);
  }
  function sendMessage(data) {
    socket.emit("message", data);
  }
  function receiveMessage() {
    socket.on("message", (data) => {
      const { message, userId, username } = data;

      setMessages((prevState) => [...prevState, { message, userId, username }]);
    });
    socket.on("sign-in", (data) => {
      const { message, userId, username } = data;

      setMessages((prevState) => [...prevState, { message, userId, username }]);
    });
  }
  function disconnect() {
    socket.on("disconnection", (data) => {
      const { message, userId, username } = data;
      setMessages((prevState) => [...prevState, { message, userId, username }]);
    });
  }

  useEffect(() => {
    /* adds a new message when a user joins the chat */
    receiveMessage();
    disconnect();
  }, []);

  const data = {
    socket,
    username,
    userId,
    roomId,
    messages,
    receiveMessage,
    sendMessage,
    signIn,
    darkMode,
    setDarkMode,
    setUserId,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
