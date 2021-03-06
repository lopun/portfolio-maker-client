import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries";
import {
  updateProfile,
  updateProfileVariables,
  userProfile
} from "../../types/api";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_ID,
  CLOUDINARY_UPLOAD_PRESET
} from "src/cloudinary";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { toast } from "react-toastify";
import axios from "axios";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  passwordCheck: string;
  profilePhoto: string;
  uploading: boolean;
  age: string;
  password: string;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    age: "",
    password: "",
    passwordCheck: "",
    uploading: false
  };
  public render() {
    const {
      email,
      firstName,
      lastName,
      profilePhoto,
      uploading,
      age,
      password,
      passwordCheck
    } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        onCompleted={data => this.updateFields(data)}
        fetchPolicy={"cache-and-network"}
      >
        {({}) => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            variables={{
              email,
              firstName,
              lastName,
              profilePhoto,
              password,
              age: Number(age)
            }}
            onCompleted={data => {
              const { UpdateProfile } = data;
              console.log(data);
              console.log(this.state);
              if (UpdateProfile.ok) {
                toast.success("Profile Updated!");
              } else if (UpdateProfile.error) {
                toast.error(UpdateProfile.error);
              }
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                password={password}
                age={String(age)}
                passwordCheck={passwordCheck}
                profilePhoto={profilePhoto}
                onInputChange={this.onInputChange}
                loading={loading}
                onSubmit={updateProfileFn}
                uploading={uploading}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;

    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", CLOUDINARY_API_KEY || "");
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET || "");
      formData.append("timestamp", String(Date.now() / 1000));
      const request = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID || ""}/image/upload`,
        formData
      );
      const {
        data: { secure_url }
      } = request;
      if (secure_url) {
        await this.setState({
          uploading: false,
          profilePhoto: secure_url
        });
        console.log(this.state);
      }
    }

    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = async (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto, age } = user;
        console.log(user);
        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto,
          age
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
