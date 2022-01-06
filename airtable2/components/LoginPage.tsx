import { useFlow } from "flovv/react";
import { SyntheticEvent, useRef } from "react";
import styled from "styled-components";
import Login from "../flows/Login";

const LoginForm = styled.form``;

const LoginPage = () => {
  const inputRef = useRef<HTMLInputElement>();
  const login = useFlow(Login).restart;

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    login(inputRef.current.value);
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <label htmlFor="StudentNameInput">Student name</label>
      <input id="StudentNameInput" ref={inputRef} />
    </LoginForm>
  );
};

export default LoginPage;
 