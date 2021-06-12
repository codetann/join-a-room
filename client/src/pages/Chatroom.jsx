import React, { useEffect, useRef } from "react";
import { useAppContext } from "../context/Provider";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Chatroom() {
  const inputRef = useRef();
  const endRef = useRef(null);
  const history = useHistory();
  const {
    sendMessage,
    messages,
    roomId,
    userId,
    username,
    darkMode,
    setDarkMode,
  } = useAppContext();

  /* sends the messages view to the current message at the bottom */
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* sends message to the server and then to the other chatroom members */
  const handleSend = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;

    /* sends message to server */
    sendMessage({
      userId,
      message: inputRef.current.value,
      roomId,
      username,
    });

    inputRef.current.value = "";
  };

  /* sends the user back to the home screen */
  const handleHome = (e) => {
    e.preventDefault();
    history.push("/");
  };

  // Scroll to bottom when new message is sent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sends user back to sign in page if they refresh on chat page
  useEffect(() => {
    if (roomId === "") history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <Container darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <>
          <BackIcon
            onClick={handleHome}
            role="button"
            className="fas fa-arrow-left"
          />
          <p>Room: {roomId}</p>
        </>
        <ToggleTheme onClick={() => setDarkMode((prevState) => !prevState)}>
          <Icon
            darkMode={darkMode}
            className={`fas fa-${darkMode ? "moon" : "sun"}`}
          />
        </ToggleTheme>
      </Header>
      <MessagesContainer>
        {messages.map((msg, i) =>
          msg.userId === userId ? (
            <UserDiv key={i} darkMode={darkMode}>
              <UserMessage>{msg.message}</UserMessage>
              <Username darkMode={darkMode}>{msg.username}</Username>
            </UserDiv>
          ) : (
            <OtherDiv key={i} darkMode={darkMode}>
              <OtherMessage darkMode={darkMode}>{msg.message}</OtherMessage>
              <Username darkMode={darkMode}>{msg.username}</Username>
            </OtherDiv>
          )
        )}
        <InputContainer darkMode={darkMode}>
          <Input ref={inputRef} type="text" darkMode={darkMode} />
          <Send onClick={handleSend}>Send</Send>
        </InputContainer>
        <div ref={endRef} />
      </MessagesContainer>
    </Container>
  );
}

// - Styled Components - //
const Container = styled.div`
  transition: 0.3s;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 4rem 1rem;
  background: ${(props) => (props.darkMode ? "#0D1117" : "white")};
`;

// Messages
const MessagesContainer = styled.div`
  transition: 0.3s;
  bottom: 0;
  width: 100%;
  max-width: 1000px;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  max-height: 100%;
`;
const UserDiv = styled.div`
  transition: 0.3s;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  margin: 1rem;
`;
const UserMessage = styled.p`
  transition: 0.3s;
  padding: 1rem;
  background: #0dca92;
  color: white;
  border-radius: 1.3rem 1.3rem 0.3rem 1.3rem;
  max-width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
`;
const OtherDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  margin: 1rem;
  transition: 0.3s;
`;
const Username = styled.p`
  transition: 0.3s;
  transition: 0.3s;
  font-size: 14px;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;
const OtherMessage = styled.p`
  transition: 0.3s;
  padding: 1rem;
  background: ${(props) => (props.darkMode ? "#222b38" : "#f7f7f5")};
  color: ${(props) => (props.darkMode ? "white" : "#131313")};
  border-radius: 1.3rem 1.3rem 1.3rem 0.3rem;
  max-width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Back Button
const Header = styled.div`
  transition: 0.3s;
  position: fixed;
  z-index: 3;
  width: 100%;
  max-width: 1000px;
  background: ${(props) => (props.darkMode ? "#0D1117" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  height: 5rem;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
const BackIcon = styled.i`
  font-size: 18px;
  margin-right: 1rem;
  cursor: pointer;
`;

// Inputs
const InputContainer = styled.form`
  transition: 0.3s;
  position: fixed;
  width: 100%;
  max-width: 1000px;
  background: ${(props) => (props.darkMode ? "#0D1117" : "white")};
  height: 5rem;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;
const Input = styled.input`
  transition: 0.3s;
  height: 3rem;
  width: 80%;
  border: 2px solid ${(props) => (props.darkMode ? "#222b38" : "#bebebe")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  outline: none;
  padding-left: 1rem;
  border-radius: 1.5rem 0 0 1.5rem;
`;
const Send = styled.button`
  width: 20%;
  height: 3rem;
  cursor: pointer;
  background: #0dca92;
  color: white;
  font-weight: bold;
  border-radius: 0 1.5rem 1.5rem 0rem;
  border: 1px solid #0dca92;
`;
const ToggleTheme = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const Icon = styled.i`
  transition: 0.3s;
  font-size: 28px;
  background: none;
  color: ${(props) => (props.darkMode ? "#9b94fa" : "#F7BC07")};
  border: none;
  cursor: pointer;
`;
