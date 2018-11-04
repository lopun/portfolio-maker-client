import React from "react";
import styled from "styled-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import PhotoInput from "src/Components/PhotoInput";

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

const SignupForm = styled(Form)`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
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

const SignUpPresenter = ({
  firstName,
  lastName,
  email,
  password,
  age,
  profilePhoto,
  updateFn,
  history,
  onInputChange,
  uploading
}) => (
  <Container>
    <SignupForm submitFn={updateFn}>
      <Logo onClick={() => history.push("/login")}>Portfolio Maker</Logo>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <Input
        value={email}
        name={"email"}
        onChange={onInputChange}
        placeholder={"Email"}
        type={"email"}
      />
      <Input
        value={password}
        name={"password"}
        onChange={onInputChange}
        placeholder={"Password"}
        type={"password"}
      />
      <Input
        value={firstName}
        name={"firstName"}
        onChange={onInputChange}
        placeholder={"FirstName"}
        type={"firstName"}
      />
      <Input
        value={lastName}
        name={"lastName"}
        onChange={onInputChange}
        placeholder={"LastName"}
        type={"lastName"}
      />
      <Input
        value={age}
        name={"age"}
        onChange={onInputChange}
        placeholder={"Age"}
        type={"age"}
      />
      <Button type={"submit"}>SignUp</Button>
    </SignupForm>
  </Container>
);

export default SignUpPresenter;
