import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import EditAccount from "src/Routes/EditAccount";
import Home from "src/Routes/Home";
import Login from "src/Routes/Login";

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

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
