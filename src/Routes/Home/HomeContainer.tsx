import React from "react";
import HomePresenter from "./HomePresenter";
import { ALL_USERS } from "./HomeQueries";
import { Query } from "react-apollo";

class HomeContainer extends React.Component<any> {
  public render() {
    const { handlePush } = this;
    return (
      <Query query={ALL_USERS}>
        {({ data, loading, error }) => {
          console.log(data);
          return (
            <HomePresenter
              data={data}
              loading={loading}
              handlePush={handlePush}
            />
          );
        }}
      </Query>
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
}

export default HomeContainer;
