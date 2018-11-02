import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";
import { Query } from "react-apollo";
import { getUserProfile } from "src/types/api";
import { GET_USER_PROFILE } from "./UserDetailQueries";
import { toast } from "react-toastify";

class GetUserProfileQuery extends Query<getUserProfile> {}

class UserDetailContainer extends React.Component<any> {
  public state = {
    id: null,
    email: null,
    fullName: null,
    age: null,
    resume: null,
    projects: null,
    currentMenu: 0
  };

  public render() {
    const {
      match: {
        params: { id: userId }
      }
    } = this.props;
    const { id, email, fullName, age, resume, projects, currentMenu } = this.state;
    return <GetUserProfileQuery query={GET_USER_PROFILE} // tslint:disable-next-line
        variables={{ id: parseInt(userId) }} onCompleted={data => this.updateFields(data)}>
        {({ data, loading, error }) => <UserDetailPresenter id={id} email={email} fullName={fullName} age={age} resume={resume} projects={projects} changeMenu={this.changeMenu} currentMenu={currentMenu}/>}
      </GetUserProfileQuery>;
  }

  public updateFields = async (data: {} | getUserProfile) => {
    console.log("Updated");
    if ("GetUserProfile" in data) {
      const {
        GetUserProfile: { ok, error, user }
      } = data;
      if (ok) {
        if (user !== null) {
          const { id, email, fullName, age, resume, projects } = user;
          this.setState({
            id,
            email,
            fullName,
            age,
            resume,
            projects
          });
        }
      } else if (error) {
        toast.error(error);
      }
    }
  };

  public changeMenu = currentMenu => {
    this.setState({ currentMenu });
  };
}

export default UserDetailContainer;
