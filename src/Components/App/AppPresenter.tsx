import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "src/Routes/Home";
import UserDetail from "src/Routes/UserDetail";
import Login from "src/Routes/Login";
import Resume from "src/Routes/Resume";
import Projects from "src/Routes/Projects";
import ProjectDetail from "src/Routes/ProjectDetail";
import EditAccount from "src/Routes/EditAccount";

// interface : 앞으로 쓸 틀을 짜는 것
// App presenter가 받을 props는 isLoggedIn이 있음. 이름과 타입을 명시
interface IProps {
  isLoggedIn: boolean;
}

// React.SFC : state가 없는 컴포넌트
// <>안에 앞에서 정해 놓은 interface를 집어 넣어줌
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
  localStorage.setItem("isLoggedIn", `${isLoggedIn}`);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/users/:id"} component={UserDetail} />
          <Route path={"/edit-account"} component={EditAccount} />
          <Route path={"/resume"} component={Resume} />
          <Route exact={true} path={"/projects"} component={Projects} />
          <Route path={"/projects/:id"} component={ProjectDetail} />
          <Redirect from={"*"} to={"/"} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
