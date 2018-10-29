import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "src/typed-components";

const Container = styled.div`
  height: 100vh;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
`;

interface IProps extends RouteComponentProps<any> {}

const OutHomePresenter: React.SFC<IProps> = ({}) => (
  <Container>
    <Helmet>
      <title>Login | PortfolioMaker</title>
    </Helmet>
    <Title>Portfolio Maker</Title>
    <Footer>
      <Link to={"/social-login"}>
        <SocialLogin>
          <SocialLink>Connect with social</SocialLink>
        </SocialLogin>
      </Link>
    </Footer>
  </Container>
);

export default OutHomePresenter;
