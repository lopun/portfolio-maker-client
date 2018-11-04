import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import PhotoInput from "src/Components/PhotoInput";
import styled from "src/typed-components";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  password: string;
  passwordCheck: string;
  profilePhoto: string;
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  password,
  age,
  passwordCheck,
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  uploading
}) => (
  <>
    <Header title={"Portfolio Maker"} />
    <Container>
      <Helmet>
        <title>Edit Account | Number</title>
      </Helmet>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedForm
        submitFn={() => {
          if (password === passwordCheck) {
            onSubmit();
          } else {
            toast.error("Password Does not match!");
          }
        }}
      >
        <ExtendedInput
          onChange={onInputChange}
          type={"text"}
          value={firstName}
          placeholder={"First name"}
          name={"firstName"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"text"}
          value={lastName}
          placeholder={"Last name"}
          name={"lastName"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"email"}
          value={email}
          placeholder={"Email"}
          name={"email"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"age"}
          value={age}
          placeholder={"Age"}
          name={"age"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"password"}
          value={password}
          placeholder={"Enter Password"}
          name={"password"}
          required={false}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"password"}
          value={passwordCheck}
          placeholder={"Enter password again"}
          name={"passwordCheck"}
          required={false}
        />
        <Button onClick={null} value={loading ? "Loading" : "Update"} />
      </ExtendedForm>
    </Container>
  </>
);

export default EditAccountPresenter;
