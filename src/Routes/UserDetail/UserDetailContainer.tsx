import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";
import { Query, Mutation } from "react-apollo";
import { getUserProfile, createLike, createLikeVariables } from "src/types/api";
import { GET_USER_PROFILE, CREATE_LIKE } from "./UserDetailQueries";
import { toast } from "react-toastify";

class GetUserProfileQuery extends Query<getUserProfile> {}

class CreateLikeMutation extends Mutation<createLike, createLikeVariables> {}

class UserDetailContainer extends React.Component<any> {
  public state = {
    id: null,
    email: null,
    fullName: null,
    age: null,
    resume: null,
    projects: null,
    likeCount: null,
    likeState: false,
    currentMenu: 0
  };

  public render() {
    const {
      match: {
        params: { id: userId }
      }
    } = this.props;
    const {
      email,
      fullName,
      age,
      resume,
      projects,
      currentMenu,
      likeCount,
      likeState
    } = this.state;
    return (
      <CreateLikeMutation
        mutation={CREATE_LIKE}
        variables={{ receiverId: Number(userId) }}
        onCompleted={data => this.updateLikeField(data)}
        refetchQueries={[
          { query: GET_USER_PROFILE, variables: { id: Number(userId) } }
        ]}
      >
        {likeFn => (
          <GetUserProfileQuery
            query={GET_USER_PROFILE}
            variables={{ id: Number(userId) }}
            onCompleted={data => this.updateFields(data)}
          >
            {() => (
              <UserDetailPresenter
                email={email}
                fullName={fullName}
                age={age}
                resume={resume}
                projects={projects}
                likeCount={likeCount}
                likeState={likeState}
                changeMenu={this.changeMenu}
                currentMenu={currentMenu}
                likeFn={likeFn}
              />
            )}
          </GetUserProfileQuery>
        )}
      </CreateLikeMutation>
    );
  }

  public updateLikeField = async (data: {} | createLike) => {
    if ("CreateLike" in data) {
      const {
        CreateLike: { ok, error, likeState }
      } = data;
      if (ok) {
        this.setState({
          likeState
        });
      } else if (error) {
        toast.error(error);
      }
    }
  };

  public updateFields = async (data: {} | getUserProfile) => {
    if ("GetUserProfile" in data) {
      const {
        GetUserProfile: { ok, error, user, likeCount, myLike }
      } = data;
      if (ok) {
        if (user !== null) {
          const { id, email, fullName, age, resume, projects } = user;
          let likeState;
          if (myLike) {
            const { state } = myLike;
            console.log(state);
            likeState = state === "LIKE";
          } else {
            likeState = null;
          }
          this.setState({
            id,
            email,
            fullName,
            age,
            resume,
            projects,
            likeCount,
            likeState
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
