import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from 'react-toastify';
import Form from "src/Components/Form";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;


const ContentPreview = styled.div`
  width: 100%;
`;


const Button = styled.button`
  border: none;
  background-color: ${props => props.theme.greyColor};
  flex: 1;
  font-size: 25px;
  color: white;
  padding: 8px;
  margin-top: 14px;
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

const MarkdownWrapper = styled.div`
  flex: 1;
`;

const ContentInput = styled(TextareaAutosize)`
  width: 450px;
  font-size: 18px;
  margin-top: 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 8px;
  outline: none;
  background-color: transparent;
  resize: none;
  outline: none;
  flex: 1;
  margin-right: 20px;
`;

const AddProjectForm = styled(Form)``;

const ResumeEditPresenter = ({ name, content, onInputChange, updateFn }) => (
  <>
    <Header title={"Portfolio"} />
    <Container>
      <Helmet>
        <title>Resume | Portfolio Maker</title>
      </Helmet>
      <AddProjectForm
        submitFn={() => {
          console.log("Submitting")
          if (content!== "" && name!=="") {
            updateFn();
            return;
          }
          toast.error("You should fill out every form!");
        }}
      >
        <ContentInput
          value={name}
          name={"name"}
          onChange={onInputChange}
        />
          

        <ContentPreview>
          <ContentInput 
            value={content}
            onChange={onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
          <MarkdownWrapper>
            <ReactMarkdown source={content}/>
          </MarkdownWrapper>
          <Button onClick={() => null} type={"submit"}>
            Edit Resume
          </Button>
        </ContentPreview>
        <Button onClick={() => null}>
            Delete Resume
        </Button>
      </AddProjectForm>
      
    </Container>
  </>
);

export default ResumeEditPresenter;