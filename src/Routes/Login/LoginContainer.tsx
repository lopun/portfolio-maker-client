import React from "react";
import LoginPresenter from "./LoginPresenter";
import { Mutation } from "react-apollo";
import { login, loginVariables } from "src/types/api";
import { LOGIN } from "./LoginQueries";
import { LOG_USER_IN } from "src/locallysharedQueries";
import { toast } from "react-toastify";

class LoginMutation extends Mutation<login, loginVariables> {}

class LoginContainer extends React.Component<any> {
  public state = {
    email: "",
    password: "",
    token: ""
  };

  public render() {
    const { email, password, token } = this.state;
    const { history } = this.props;
    return (
      <Mutation mutation={LOG_USER_IN} variables={{ token }}>
        {locallyLogin => (
          <LoginMutation
            mutation={LOGIN}
            variables={{ email, password }}
            onCompleted={async data => {
              const {
                EmailSignIn: { ok, error, token: gotToken }
              } = data;
              if (ok) {
                await this.setState({ token: gotToken });
                await locallyLogin();
                history.push("/");
              } else if (error) {
                toast.error(error);
              }
            }}
          >
            {(loginFn, { loading }) => (
              <LoginPresenter
                onInputChange={this.onInputChange}
                email={email}
                password={password}
                history={this.props.history}
                onSubmit={loginFn}
              />
            )}
          </LoginMutation>
        )}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default LoginContainer;
