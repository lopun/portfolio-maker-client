import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import EditAccount from "src/Routes/EditAccount";
import Home from "src/Routes/Home";
import Login from "src/Routes/Login";

// interface : 앞으로 쓸 틀을 짜는 것
// App presenter가 받을 props는 isLoggedIn이 있음. 이름과 타입을 명시
interface IProps {
  isLoggedIn: boolean;
}

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route exact={true} path={"/"} component={Login} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route exact={true} path={"/"} component={Home} />
    <Route path={"/edit-account"} component={EditAccount} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

// React.SFC : state가 없는 컴포넌트
// <>안에 앞에서 정해 놓은 interface를 집어 넣어줌
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
