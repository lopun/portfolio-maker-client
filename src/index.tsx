import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import client from "./apollo";
import { ApolloProvider } from "react-apollo";
import GlobalStyle from "src/global-styles";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
