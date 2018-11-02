import React from "react";
import styled from "../../typed-components";
import BackArrow from "../BackArrow";
import { Query, Mutation } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import { userProfile } from "src/types/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LOG_USER_OUT } from "src/locallysharedQueries";

const Container = styled.header`
  width: 100%;
  background-color: white;
  color: white;
  display: flex;
  justify-content: space-between;
  height: 50px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  & svg {
    fill: white;
  }
  margin-bottom: 50px;
  padding: 0 30px;
  font-weight: 700;
`;

const Title = styled(Link)`
  color: #0e4d9e;
`;

const Profile = styled.div`
  color: #0e4d9e;
  display: flex;
  cursor: pointer;
`;

const ProfileModal = styled.div`
  position: fixed;
  top: 60px;
  right: 25px;
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const ProfileSpan = styled.span``;

const Option = styled.div`
  text-align: right;
`;

const ModalLink = styled(Link)`
  text-align: right;
`;

const Login = styled(Link)`
  margin-right: 10px;
  color: #0e4d9e;
  font-weight: 700;
  cursor: pointer;
`;

interface IProps {
  title: string;
  backTo?: string;
}

class UserProfileQuery extends Query<userProfile> {}

class Header extends React.Component<IProps, any> {
  public state = {
    fullName: "",
    modal: false
  };

  public componentDidMount() {
    if (localStorage.getItem("fullName")) {
      this.setState({ fullName: localStorage.getItem("fullName") });
    }
  }

  public render() {
    const { title, backTo } = this.props;
    const { fullName, modal } = this.state;
    const { handleLogOut } = this;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return (
      <Container>
        {backTo && <BackArrow backTo={backTo} />}
        <Title to={"/"}>{title}</Title>
        {isLoggedIn === "true" ? (
          <UserProfileQuery
            query={USER_PROFILE}
            onCompleted={data => {
              if ("GetMyProfile" in data) {
                const {
                  GetMyProfile: { ok, error, user }
                } = data;
                if (ok) {
                  if (user) {
                    const { fullName: gotFullName } = user;
                    this.setState({ fullName: gotFullName });
                    if (gotFullName) {
                      localStorage.setItem("fullName", gotFullName);
                    }
                  }
                } else if (error) {
                  toast.error(error);
                }
              }
            }}
          >
            {() => (
              <Mutation mutation={LOG_USER_OUT}>
                {logoutFn => (
                  <Profile>
                    {modal && (
                      <ProfileModal>
                        <Option onClick={() => handleLogOut(logoutFn)}>
                          LOGOUT
                        </Option>
                        <hr />
                        <ModalLink to={"/edit-account"}>Edit Account</ModalLink>
                        <hr />
                        <ModalLink to={"/resume"}>Manage Resume</ModalLink>
                        <hr />
                        <ModalLink to={"/projects"}>Manage Projects</ModalLink>
                      </ProfileModal>
                    )}
                    <ProfileSpan onClick={this.toggleModal}>
                      {fullName}
                    </ProfileSpan>
                  </Profile>
                )}
              </Mutation>
            )}
          </UserProfileQuery>
        ) : (
          <Login to={"/login"}>Login</Login>
        )}
      </Container>
    );
  }
  public toggleModal = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
  };

  public handleLogOut = logoutFn => {
    this.setState(state => ({
      modal: !state.modal
    }));
    localStorage.removeItem("fullName");
    logoutFn();
    window.location.pathname = "/";
    window.location.reload();
  };
}

export default Header;
