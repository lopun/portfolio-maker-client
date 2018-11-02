import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import MarkdownView from "src/Components/MarkdownView";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;
const ResumeDetailPresenter = ({ name, content }) => (
  <>
    <Header title={"Portfolio"} />
    <Container>
      <Helmet>
        <title>Project | Portfolio Maker</title>
      </Helmet>
      <MarkdownView name={name} content={content} />
    </Container>
  </>
);

export default ResumeDetailPresenter;
