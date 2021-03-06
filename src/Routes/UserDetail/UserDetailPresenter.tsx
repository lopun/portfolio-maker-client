import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import MarkdownView from "src/Components/MarkdownView";
import { Link } from "react-router-dom";
import ProjectWrapper from "src/Components/ProjectWrapper";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  font-size: 24px;
  font-weight: 400;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const PortfolioWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const ToggleMenu = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  flex: 1;
  text-align: center;
  background-color: white;
  border: none;
  outline: none;
  height: 50px;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-right: 20px;
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
  transition: 0.5s;
  &:active {
    outline: none;
  }
  &:last-child {
    margin-right: 0;
  }
  cursor: pointer;
`;

const SelectedSpan = styled.span`
  color: ${props => props.theme.blueColor};
  font-weight: 700;
`;

const ResumeWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const HeartIcon = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  &:active {
    outline: none;
  }
`;

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HandleRecommend = styled(Link)`
  padding: 8px;
  font-size: 25px;
`;

const RecommendsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserDetailPresenter = ({
  userId,
  email,
  fullName,
  age,
  resume,
  projects,
  changeMenu,
  currentMenu,
  likeCount,
  likeState,
  likeFn,
  recommends,
  isLoggedIn,
  existingRecommend,
  profilePhoto
}) => (
  <>
    <Header title={"Portfolio Maker"} />
    <Container>
      <Helmet>
        <title>{`${fullName && fullName} | Portfolio Maker`}</title>
      </Helmet>
      <UserWrapper>
        <InfoWrapper>
          <ProfileImage src={profilePhoto} />
          <SpanWrapper>
            <Info>{fullName && fullName}</Info>
            <Info>{age && age}</Info>
            <Info>{email && email}</Info>
            <Info>
              <IconContext.Provider value={{ color: "#ed4d62", size: "20px" }}>
                <HeartIcon onClick={likeFn}>
                  {likeState ? <FaHeart /> : <FaRegHeart />}
                </HeartIcon>
              </IconContext.Provider>
              {likeCount && likeCount}
            </Info>
          </SpanWrapper>
        </InfoWrapper>
        {isLoggedIn ? (
          existingRecommend ? (
            <HandleRecommend to={`/recommend/${existingRecommend.id}/update`}>
              Update Recommend
            </HandleRecommend>
          ) : (
            <HandleRecommend to={`/users/${userId}/recommend/create`}>
              Write Recommend
            </HandleRecommend>
          )
        ) : (
          <HandleRecommend to={"/login"}>
            Login to Write Recommend
          </HandleRecommend>
        )}
      </UserWrapper>
      <PortfolioWrapper>
        <ToggleMenu>
          <Button onClick={() => changeMenu(0)}>
            {currentMenu === 0 ? <SelectedSpan>Resume</SelectedSpan> : "Resume"}
          </Button>
          <Button onClick={() => changeMenu(1)}>
            {currentMenu === 1 ? (
              <SelectedSpan>Projects</SelectedSpan>
            ) : (
              "Projects"
            )}
          </Button>
          <Button onClick={() => changeMenu(2)}>
            {currentMenu === 2 ? (
              <SelectedSpan>Recommends</SelectedSpan>
            ) : (
              "Recommends"
            )}
          </Button>
        </ToggleMenu>
        {currentMenu === 0 ? (
          <ResumeWrapper>
            {resume ? (
              <ResumeContainer>
                <MarkdownView name={resume.name} content={resume.content} />
              </ResumeContainer>
            ) : (
              "There's no resume!"
            )}
          </ResumeWrapper>
        ) : currentMenu === 1 ? (
          <ProjectWrapper projects={projects} edit={false}/>
        ) : (
          <RecommendsWrapper>
            {recommends && recommends !== []
              ? recommends.map(recommend => (
                  <MarkdownView
                    key={recommend.id}
                    name={""}
                    content={recommend.content}
                  />
                ))
              : "There's no recommends!"}
            {!recommends && "There's no recommends!"}
          </RecommendsWrapper>
        )}
      </PortfolioWrapper>
    </Container>
  </>
);

export default UserDetailPresenter;
