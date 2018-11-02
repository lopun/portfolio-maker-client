import { gql } from "apollo-boost";

/*
  locallyshare은 local store에서 처리할 일이니까
  모든 ts파일은 어디론가 보내는가 얘는 보내면 안되지 그래서 tsx지
*/

// @client : 원래는 back에 가서 쿼리문을 실행을 하는데 그게 아니라 browser cache에서 받아오도록 함
export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
