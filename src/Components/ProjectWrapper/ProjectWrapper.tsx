import React from "react";
import styled from "styled-components";
import StackPresenter from "../StackPresenter";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SingleProject = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const UserWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Span = styled.span`
  font-size: 20px;
`;

const Title = styled(Link)`
  font-size: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 8px;
`;

const StackWrapper = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const ProjectWrapper = ({ projects, edit }) => (
  <Container>
    {projects !== []
      ? projects.map(project => (
          <SingleProject key={project.id}>
            <Title to={`/projects/${project.id}${edit ? '/edit': ''}`}>{project.name}</Title>
            <UserWrapper to={`/users/${project.author.id}`}>
              <UserImage src={project.author.profilePhoto} />
              <Span>{project.author.fullName}</Span>
            </UserWrapper>
            <StackWrapper to={`/projects/${project.id}${edit ? '/edit': ''}`}>
              <StackPresenter stack={project.stack} stackFilter={() => null} />
            </StackWrapper>
          </SingleProject>
        ))
      : "Project does not exist!"}
  </Container>
);

export default ProjectWrapper;
