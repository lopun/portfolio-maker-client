import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import { Mutation } from "react-apollo";
import { emailSignUp, emailSignUpVariables } from "src/types/api";
import { EMAIL_SIGN_UP } from "./SignUpQueries";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_ID,
  CLOUDINARY_UPLOAD_PRESET
} from "src/cloudinary";
import { LOG_USER_IN } from "src/locallysharedQueries";
import axios from "axios";
import { toast } from "react-toastify";
import { ALL_USERS } from "../Home/HomeQueries";

class EmailSignUpMutation extends Mutation<emailSignUp, emailSignUpVariables> {}

class SignUpContainer extends React.Component<any> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    profilePhoto: "",
    uploading: false,
    token: ""
  };

  public render() {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      profilePhoto,
      uploading,
      token
    } = this.state;
    const { onInputChange, onMutationCompleted } = this;
    return (
      <Mutation mutation={LOG_USER_IN} variables={{ token }}>
        {logInFn => (
          <EmailSignUpMutation
            mutation={EMAIL_SIGN_UP}
            variables={{
              firstName,
              lastName,
              email,
              password,
              age: Number(age),
              profilePhoto
            }}
            onCompleted={data => onMutationCompleted(data, logInFn)}
            refetchQueries={[{ query: ALL_USERS }]}
          >
            {updateFn => (
              <SignUpPresenter
                updateFn={updateFn}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                age={age}
                profilePhoto={profilePhoto}
                history={this.props.history}
                onInputChange={onInputChange}
                uploading={uploading}
              />
            )}
          </EmailSignUpMutation>
        )}
      </Mutation>
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

  public onMutationCompleted = async (data, logInFn) => {
    if ("EmailSignUp" in data) {
      const {
        EmailSignUp: { ok, error, token }
      } = data;
      if (ok) {
        await this.setState({ token });
        logInFn(token);
        this.props.history.push("/");
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default SignUpContainer;
