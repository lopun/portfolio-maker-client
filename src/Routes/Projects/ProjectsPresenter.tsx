import React from "react";
import Helmet from "react-helmet";
import styled from "src/typed-components";
import Header from "src/Components/Header";
import Form from "src/Components/Form";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import AutoSuggestion from "src/Components/AutoSuggestion";
import StackPresenter from "src/Components/StackPresenter";
import ProjectWrapper from "src/Components/ProjectWrapper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

const AddProjectForm = styled(Form)``;
const BigInput = styled(TextareaAutosize)`
  font-size: 25px;
  font-weight: 700;
  flex: 1;
  &::placeholder {
    font-weight: 700;
  }
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 8px;
  margin-right: 20px;
  background-color: transparent;
  resize: none;
  outline: none;
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 8px;
  outline: none;
  background-color: transparent;
  resize: none;
  outline: none;
`;
const BigContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  background-color: ${props => props.theme.greyColor};
  flex: 1;
  font-size: 25px;
  color: white;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  &:focus {
    outline: none;
  }
`;

const ProjectsPresenter = ({
  content,
  name,
  stack,
  currentStack,
  projects,
  createFn,
  onInputChange,
  onStack,
  stackFilter
  // cleanState
}) => (
  <>
    <Header title={"Portfolio Maker"} />
    <Container>
      <Helmet>
        <title>Projects | Portfolio Maker</title>
      </Helmet>
      <ProjectWrapper projects={projects} />
      <div style={{ marginBottom: "20px" }} />
      <AddProjectForm
        submitFn={() => {
          if (content !== "") {
            if (name !== "") {
              createFn();
              // cleanState();
              return;
            }
          }
          toast.error("You Should Fillout Every Form!");
        }}
      >
        <BigContainer>
          <BigInput
            value={name}
            onChange={onInputChange}
            placeholder={"Title..."}
            name={"name"}
          />
          <Button onClick={() => null} type={"submit"}>
            Add New Project
          </Button>
        </BigContainer>
      </AddProjectForm>
      <BigContainer>
        <AutoSuggestion
          value={currentStack}
          onInputChange={onInputChange}
          placeholder={"Type Stack that you use."}
          clickfn={onStack}
        />
        <StackPresenter stack={stack} stackFilter={stackFilter} />
      </BigContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={onInputChange}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <div>
          <ReactMarkdown source={content} />
        </div>
      </ContentPreview>
    </Container>
  </>
);

export default ProjectsPresenter;