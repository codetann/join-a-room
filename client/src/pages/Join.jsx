import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/Provider";

export default function Join() {
  const nameRef = useRef();
  const roomRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(false);
  const { signIn, darkMode, setDarkMode } = useAppContext();

  // Functions
  const handleSignIn = () => {
    if (nameRef.current.value === "" || roomRef.current.value === "") {
      /* throws error for required fields  */
      setError("Please enter a username and room");
      return;
    }

    // Signs in user and sends info to server
    signIn({
      roomId: roomRef.current.value,
      username: nameRef.current.value,
    });

    /* takes user to the chatroom component/page */
    history.push("/chatroom");

    /* reset the inputs to their default state */
    nameRef.current.value = "";
    roomRef.current.value = "";
  };

  return (
    <Container darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <ToggleTheme onClick={() => setDarkMode((prevState) => !prevState)}>
          <Icon
            darkMode={darkMode}
            className={`fas fa-${darkMode ? "moon" : "sun"}`}
          />
        </ToggleTheme>
      </Header>
      <h1>Join a Room</h1>
      <hr />
      {error && <p>{error}</p>}
      <Wrapper darkMode={darkMode}>
        <i className="far fa-user" />
        <Input
          ref={nameRef}
          placeholder="Username"
          darkMode={darkMode}
          type="text"
        />
      </Wrapper>
      <Wrapper darkMode={darkMode}>
        <i className="fas fa-home" />
        <Input
          ref={roomRef}
          placeholder="Room Name"
          darkMode={darkMode}
          type="text"
        />
      </Wrapper>
      <Button onClick={handleSignIn}>Join</Button>
    </Container>
  );
}

// - Styled Components - //
const Container = styled.div`
  transition: 0.3s;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) => (props.darkMode ? "#0D1117" : "white")};

  hr {
    height: 6px;
    width: 40px;
    background: #0dca92;
    border: none;
    border-radius: 0.4rem;
    margin-bottom: 2rem;
    transition: 0.3s;
  }
  h1 {
    color: #0dca92;
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 45px;
    transition: 0.3s;
  }

  p {
    font-weight: lighter;
    margin-bottom: 1rem;
    color: #ff0000;
    transition: 0.3s;
  }
`;
const Header = styled.div`
  transition: 0.3s;
  position: fixed;
  width: 100%;
  max-width: 1000px;
  background: ${(props) => (props.darkMode ? "#0D1117" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  height: 5rem;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
`;
const Wrapper = styled.div`
  transition: 0.3s;
  width: 300px;
  height: 50px;
  border: 2px solid ${(props) => (props.darkMode ? "#616f83" : "#bebebe")};
  color: ${(props) => (props.darkMode ? "#47566b" : "#bebebe")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  transition: 0.2s;
  margin: 1rem 0;

  &:focus-within {
    border: 2px solid #0dca92;

    i {
      color: #0dca92;
    }
  }

  i {
    transition: 0.2s;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

  &:hover {
    border: 2px solid #0dca92;

    i {
      color: #0dca92;
    }
  }
`;
const Input = styled.input`
  transition: 0.3s;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.4rem;
  outline: none;
  color: ${(props) => (props.darkMode ? "#ffffff" : "#1f1f1f")};

  &::placeholder {
    color: ${(props) => (props.darkMode ? "#616f83" : "#bebebe")};
  }
`;
const Button = styled.button`
  padding: 1rem 3rem;
  background-color: #0dca92;
  color: white;
  font-weight: bold;
  border-radius: 2rem;
  border: none;
  outline: none;
  margin-top: 2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
const ToggleTheme = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
`;

const Icon = styled.i`
  transition: 0.3s;
  font-size: 28px;
  background: none;
  color: ${(props) => (props.darkMode ? "#9b94fa" : "#F7BC07")};
  border: none;
  cursor: pointer;
`;
