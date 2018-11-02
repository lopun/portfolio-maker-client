/*
  client from ./apollo

  원래 apollo를 백에랑 왔다갔다 할건데
  graphQL이랑 똑같은 문법으로 작동하는데
  클라이언트에서만 사용하는 스토어(리덕스의 스토어와 같은 개념)를 새로 만들었다.
*/

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
