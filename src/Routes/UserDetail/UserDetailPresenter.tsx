import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";

const Container = styled.div`
  width: 100%;
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
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
  transition: 0.5s;
  &:active {
    outline: none;
  }
  &:first-child {
    margin-right: 20px;
  }
  cursor: pointer;
`;

const SelectedSpan = styled.span`
  color: blue;
`;

const ResumeWrapper = styled.div`
  display: flex;
`;

const ProjectWrapper = styled.div``;

const Project = styled.div``;

const UserDetailPresenter = ({
  id,
  email,
  fullName,
  age,
  resume,
  projects,
  changeMenu,
  currentMenu
}) => (
  <Container>
    <Helmet>
      <title>{`${fullName && fullName} | Portfolio Maker`}</title>
    </Helmet>
    <Header title={"Portfolio Maker"} />
    <UserWrapper>
      <Info>NAME: {fullName && fullName}</Info>
      <Info>AGE: {age && age}</Info>
      <Info>EMAIL: {email && email}</Info>
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
      </ToggleMenu>
      {currentMenu === 0 ? (
        <ResumeWrapper>
          {resume ? resume.name : "There's no resume!"}
        </ResumeWrapper>
      ) : (
        <ProjectWrapper>
          {projects && projects !== []
            ? projects.map(project => (
                <Project key={project.id}>{project.content}</Project>
              ))
            : "There's No Project!"}
        </ProjectWrapper>
      )}
    </PortfolioWrapper>
  </Container>
);

export default UserDetailPresenter;
