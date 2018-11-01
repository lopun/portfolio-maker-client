import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";

const Container = styled.div``;

const UserWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const SingleUser = styled.div`
  width: 30%;
  height: 100px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.19), 0 2px 6px rgba(0, 0, 0, 0.23);
`;

const HomePresenter = ({ data, loading, handlePush }) => (
  <Container>
    <Helmet>
      <title>Home | Portfolio Maker</title>
    </Helmet>
    <UserWrapper>
      {!loading &&
        data &&
        data.AllUsers &&
        data.AllUsers.users.map(user => (
          <SingleUser onClick={() => handlePush(user)} key={user.id}>
            {user.fullName}
          </SingleUser>
        ))}
    </UserWrapper>
  </Container>
);

export default HomePresenter;
