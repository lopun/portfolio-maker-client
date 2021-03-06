import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "src/Routes/Home";
import UserDetail from "src/Routes/UserDetail";
import RecommendCreate from "src/Routes/RecommendCreate";
import RecommendUpdate from "src/Routes/RecommendUpdate";
import Login from "src/Routes/Login";
import SignUp from "src/Routes/SignUp";
import ResumeCreate from "src/Routes/ResumeCreate";
import ResumeDetail from "src/Routes/ResumeDetail";
import ResumeEdit from "src/Routes/ResumeEdit";
import Projects from "src/Routes/Projects";
import ProjectDetail from "src/Routes/ProjectDetail";
import ProjectEdit from "src/Routes/ProjectEdit";
import EditAccount from "src/Routes/EditAccount";

// interface : 앞으로 쓸 틀을 짜는 것
// App presenter가 받을 props는 isLoggedIn이 있음. 이름과 타입을 명시
interface IProps {
  isLoggedIn: boolean;
}

// const isDev = process.env.NODE_ENV === "development";

// React.SFC : state가 없는 컴포넌트
// <>안에 앞에서 정해 놓은 interface를 집어 넣어줌
console.log(process.env.PUBLIC_URL);
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
  localStorage.setItem("isLoggedIn", `${isLoggedIn}`);
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact={true} path={"/"} component={Home} />
          <Route exact={true} path={"/login"} component={Login} />
          <Route exact={true} path={"/signup"} component={SignUp} />
          <Route
            exact={true}
            path={"/users/:id"}
            render={props => <UserDetail {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            exact={true}
            path={"/users/:id/recommend/create"}
            render={props => (
              <RecommendCreate {...props} isLoggedIn={isLoggedIn} />
            )}
          />
          <Route
            exact={true}
            path={"/recommend/:id/update"}
            render={props => (
              <RecommendUpdate {...props} isLoggedIn={isLoggedIn} />
            )}
          />
          <Route exact={true} path={"/edit-account"} component={EditAccount} />
          <Route
            exact={true}
            path={"/resume/create"}
            component={ResumeCreate}
          />
          <Route exact={true} path={"/resume/:id"} component={ResumeDetail} />
          <Route
            exact={true}
            path={"/resume/:id/edit"}
            component={ResumeEdit}
          />
          <Route exact={true} path={"/projects"} component={Projects} />
          <Route
            exact={true}
            path={"/projects/:id"}
            component={ProjectDetail}
          />
          <Route
            exact={true}
            path={"/projects/:id/edit"}
            component={ProjectEdit}
          />
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
