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
    recommends: null,
    profilePhoto: null,
    currentMenu: 0,
    existingRecommend: null
  };

  public render() {
    const {
      match: {
        params: { id: userId }
      },
      isLoggedIn
    } = this.props;
    const {
      email,
      fullName,
      age,
      resume,
      projects,
      currentMenu,
      likeCount,
      likeState,
      recommends,
      existingRecommend,
      profilePhoto
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
            fetchPolicy={"cache-and-network"}
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
                recommends={recommends}
                likeFn={likeFn}
                isLoggedIn={isLoggedIn}
                existingRecommend={existingRecommend}
                userId={userId}
                profilePhoto={profilePhoto}
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
        GetUserProfile: {
          ok,
          error,
          user,
          likeCount,
          myLike,
          existingRecommend
        }
      } = data;
      if (ok) {
        if (user !== null) {
          const {
            id,
            email,
            fullName,
            age,
            resume,
            projects,
            recommendAsReceiver,
            profilePhoto
          } = user;
          let likeState;
          if (myLike) {
            const { state } = myLike;
            console.log(state);
            likeState = state === "LIKE";
          } else {
            likeState = null;
          }
          let authorizedProjects;
          if (projects) {
            authorizedProjects = projects.map(project => ({
              ...project,
              author: user
            }));
          } else {
            authorizedProjects = projects;
          }
          this.setState({
            id,
            email,
            fullName,
            age,
            resume,
            projects: authorizedProjects,
            likeCount,
            likeState,
            recommends: recommendAsReceiver,
            existingRecommend,
            profilePhoto
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
