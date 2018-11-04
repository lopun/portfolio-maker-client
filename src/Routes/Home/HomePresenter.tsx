import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";

const Container = styled.div``;

const UserWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SingleUser = styled.div`
  flex: 1;
  min-width: 300px;
  height: 100px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.19), 0 2px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

const HomePresenter = ({ users, loading, handlePush }) => (
  <Container>
    <Helmet>
      <title>Home | Portfolio Maker</title>
    </Helmet>
    <Header title={"Portfolio Maker"} />
    <UserWrapper>
      {!loading &&
        users.map(user => (
          <SingleUser onClick={() => handlePush(user)} key={user.id}>
            {user.fullName}
            <Image
              src={
                user.profilePhoto ||
                "https://res.cloudinary.com/dplj1ji7x/image/upload/v1541309689/user-placeholder.png"
              }
            />
          </SingleUser>
        ))}
    </UserWrapper>
  </Container>
);

export default HomePresenter;
