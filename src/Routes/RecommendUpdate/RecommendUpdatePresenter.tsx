import React from "react";
import Helmet from "react-helmet";
import styled from "src/typed-components";
import Header from "src/Components/Header";
import Form from "src/Components/Form";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

const AddProjectForm = styled(Form)``;

const ContentPreview = styled.div`
  display: flex;
`;

const MarkdownWrapper = styled.div`
  flex: 1;
`;

const ContentInput = styled(TextareaAutosize)`
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
const Button = styled.button`
  border: none;
  background-color: ${props => props.theme.greyColor};
  /* flex: 1; */
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

const RecommendUpdatePresenter = ({ content, onInputChange, updateFn }) => (
  <>
    <Header title={"Portfolio Maker"} />
    <Container>
      <Helmet>
        <title>Recommend | Portfolio Maker</title>
      </Helmet>
      <AddProjectForm
        submitFn={() => {
          if (content !== "") {
            updateFn();
            return;
          }
          toast.error("You Should Fillout Every Form!");
        }}
      >
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
          <MarkdownWrapper>
            <ReactMarkdown source={content} />
          </MarkdownWrapper>
        </ContentPreview>
        <Button onClick={() => null} type={"submit"}>
          Update Recommend
        </Button>
      </AddProjectForm>
    </Container>
  </>
);

export default RecommendUpdatePresenter;
