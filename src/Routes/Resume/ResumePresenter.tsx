import React from "react";
import Helmet from "react-helmet";
import styled from "src/typed-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResumePresenter = () => (
  <Container>
    <Helmet>
      <title>Resume | Portfolio Maker</title>
    </Helmet>
  </Container>
);

export default ResumePresenter;
