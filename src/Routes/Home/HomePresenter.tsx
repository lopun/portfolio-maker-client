import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";

const Container = styled.div``;

const ComponentWrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Button = styled.div<any>`
  flex: 1;
  background-color: white;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  color: ${props => props.selected && props.theme.blueColor};
  font-weight: ${props => props.selected && "700"};
  &:first-child {
    margin-right: 20px;
  }
  cursor: pointer;
`;

const HomePresenter = ({
  users,
  loading,
  handlePush,
  handleMenu,
  currentMenu
}) => (
  <Container>
    <Helmet>
      <title>Home | Portfolio Maker</title>
    </Helmet>
    <Header title={"Portfolio Maker"} />
    <ButtonWrapper>
      <Button selected={currentMenu === 0} onClick={() => handleMenu(0)}>
        User
      </Button>
      <Button selected={currentMenu === 1} onClick={() => handleMenu(1)}>
        Search Projects By Tech Stack
      </Button>
    </ButtonWrapper>
    {currentMenu === 0 ? (
      <ComponentWrapper>
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
      </ComponentWrapper>
    ) : (
      <ComponentWrapper>...</ComponentWrapper>
    )}
  </Container>
);

export default HomePresenter;
