import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "src/Routes/Home";
import Header from "src/Components/Header";
import UserDetail from "src/Routes/UserDetail";

// interface : 앞으로 쓸 틀을 짜는 것
// App presenter가 받을 props는 isLoggedIn이 있음. 이름과 타입을 명시
interface IProps {
  isLoggedIn: boolean;
}

// React.SFC : state가 없는 컴포넌트
// <>안에 앞에서 정해 놓은 interface를 집어 넣어줌
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <>
    <Header isLoggedIn={isLoggedIn} title={"Portfolio Maker"} />
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/users/:id"} component={UserDetail} />
        <Redirect from={"*"} to={"/"} />
      </Switch>
    </BrowserRouter>
  </>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
