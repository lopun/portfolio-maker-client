import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import ReactMarkdown from "react-markdown";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  flex: 3;
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
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProjectDetailPresenter = ({ name, content }) => (
  <>
    <Header title={"Portfolio"} />
    <Container>
      <Helmet>
        <title>Project | Portfolio Maker</title>
      </Helmet>
      <TitleContainer>
        <Title>{name}</Title>
      </TitleContainer>
      <ContentPreview>
        <div>
          <ReactMarkdown source={content} />
        </div>
      </ContentPreview>
    </Container>
  </>
);

export default ProjectDetailPresenter;
