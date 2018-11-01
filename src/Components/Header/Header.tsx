import React from "react";
import styled from "../../typed-components";
import BackArrow from "../BackArrow";

const Container = styled.header`
  background-color: white;
  color: white;
  display: flex;
  justify-content: space-between;
  height: 50px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  & svg {
    fill: white;
  }
  margin-bottom: 50px;
  padding: 0 10px;
`;

const Title = styled.h2`
  margin-left: 10px;
  font-weight: 700;
  color: #0e4d9e;
`;

const Profile = styled.h2`
  margin-right: 10px;
  color: #0e4d9e;
`;

const Login = styled.h2`
  margin-right: 10px;
  color: #0e4d9e;
  font-weight: 700;
`;

interface IProps {
  title: string;
  backTo?: string;
  isLoggedIn: boolean;
}

const Header: React.SFC<IProps> = ({ title, backTo, isLoggedIn }) => (
  <Container>
    {backTo && <BackArrow backTo={backTo} />}
    <Title>{title}</Title>
    {isLoggedIn ? <Profile>profile</Profile> : <Login>Login</Login>}
  </Container>
);

export default Header;
