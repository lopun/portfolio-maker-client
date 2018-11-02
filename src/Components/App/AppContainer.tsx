import React from "react";
import AppPresenter from "./AppPresenter";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import { ThemeProvider } from "src/typed-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import theme from "src/theme";

// ThemeProvider : Typescript styled component라고 검색하면 어떻게 설정해야 하는지
// 나와서 그대로 가져온 것
// ToastContainer : 
const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
      <ToastContainer
        draggable={true}
        position={toast.POSITION.BOTTOM_CENTER}
      />
    </>
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
