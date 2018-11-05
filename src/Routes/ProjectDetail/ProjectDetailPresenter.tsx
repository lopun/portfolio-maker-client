import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import MarkdownView from "src/Components/MarkdownView";
import StackPresenter from "src/Components/StackPresenter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;
const ProjectDetailPresenter = ({ name, content, stack }) => (
  <>
    <Header title={"Portfolio"} />
    <Container>
      <Helmet>
        <title>Project | Portfolio Maker</title>
      </Helmet>
      <MarkdownView name={name} content={content} />
      <StackPresenter stack={stack} stackFilter={() => null} />
    </Container>
  </>
);

export default ProjectDetailPresenter;
