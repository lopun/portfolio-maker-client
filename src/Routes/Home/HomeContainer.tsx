import React from "react";
import HomePresenter from "./HomePresenter";
import { ALL_USERS, SEARCH_BY_STACK } from "./HomeQueries";
import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { allUsers, searchByStack, searchByStackVariables } from "src/types/api";

class AllUsersQuery extends Query<allUsers> {}

class SearchByStack extends Query<searchByStack, searchByStackVariables> {}

class HomeContainer extends React.Component<any> {
  public state = {
    users: [],
    currentMenu: 0,
    input: "",
    projects: []
  };

  public render() {
    const {
      handlePush,
      handleMenu,
      updateFields,
      onInputChange,
      onQueryCompleted
    } = this;
    const { currentMenu, input, projects } = this.state;
    return (
      <SearchByStack
        query={SEARCH_BY_STACK}
        variables={{ input }}
        skip={input === ""}
        onCompleted={onQueryCompleted}
        fetchPolicy={"cache-and-network"}
      >
        {({ refetch }) => (
          <AllUsersQuery
            query={ALL_USERS}
            onCompleted={data => updateFields(data)}
            fetchPolicy={"cache-and-network"}
          >
            {({ data, loading, error }) => {
              return (
                <HomePresenter
                  users={this.state.users}
                  loading={loading}
                  handlePush={handlePush}
                  currentMenu={currentMenu}
                  handleMenu={handleMenu}
                  onInputChange={onInputChange}
                  input={input}
                  refetch={refetch}
                  projects={projects}
                />
              );
            }}
          </AllUsersQuery>
        )}
      </SearchByStack>
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

  public handleMenu = num => {
    this.setState({
      currentMenu: num
    });
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

  public onQueryCompleted = async (data: {} | searchByStack) => {
    if ("SearchByStack" in data) {
      const {
        SearchByStack: { ok, error, projects }
      } = data;
      if (ok) {
        this.setState({
          projects
        });
        console.log(projects);
      } else if (error) {
        toast.error(error);
      }
    }
  };

  public onInputChange = async event => {
    const {
      target: { value }
    } = event;
    this.setState({
      input: value
    } as any);
  };
}

export default HomeContainer;
