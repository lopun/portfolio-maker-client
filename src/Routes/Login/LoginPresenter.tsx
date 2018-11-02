import React from "react";
import styled from "styled-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2), white);
`;

const Logo = styled.div`
  width: 100%;
  font-size: 30px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const LoginForm = styled(Form)`
  width: 30%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 3px;
`;

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: ${props => props.theme.blueColor};
`;

const LoginPresenter = ({
  onInputChange,
  email,
  password,
  history,
  onSubmit
}) => (
  <Container>
    <LoginForm submitFn={onSubmit}>
      <Logo onClick={() => history.push("/")}>Portfolio Maker</Logo>
      <Input
        value={email}
        name={"email"}
        onChange={onInputChange}
        placeholder={"email"}
        type={"email"}
      />
      <Input
        value={password}
        name={"password"}
        onChange={onInputChange}
        placeholder={"password"}
        type={"password"}
      />
      <Button type={"submit"}>Login</Button>
    </LoginForm>
  </Container>
);

export default LoginPresenter;
