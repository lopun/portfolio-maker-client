import React from "react";
import HomePresenter from "./HomePresenter";
import { ALL_USERS } from "./HomeQueries";
import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { allUsers } from "src/types/api";

class AllUsersQuery extends Query<allUsers> {}

class HomeContainer extends React.Component<any> {
  public state = {
    users: []
  };

  public render() {
    const { handlePush } = this;
    return (
      <AllUsersQuery
        query={ALL_USERS}
        onCompleted={data => this.updateFields(data)}
        fetchPolicy={"cache-and-network"}
      >
        {({ data, loading, error }) => {
          return (
            <HomePresenter
              users={this.state.users}
              loading={loading}
              handlePush={handlePush}
            />
          );
        }}
      </AllUsersQuery>
    );
  }

  public handlePush = user => {
    const { history } = this.props;
    console.log(this.props);
    if (user) {
      history.push({ pathname: `/users/${user.id}` });
    } else {
      history.push("/");
    }
  };

  public updateFields = async (data: {} | allUsers) => {
    if ("AllUsers" in data) {
      const {
        AllUsers: { ok, error, users }
      } = data;
      if (ok) {
        if (users !== [] || users !== undefined) {
          this.setState({
            users
          } as any);
        }
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default HomeContainer;
