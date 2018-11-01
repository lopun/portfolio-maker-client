import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";

class UserDetailContainer extends React.Component<any> {
  public render() {
    const {
      match: {
        params: { id: userId }
      }
    } = this.props;
    console.log(userId);
    return <UserDetailPresenter userId={userId} />;
  }
}

export default UserDetailContainer;
