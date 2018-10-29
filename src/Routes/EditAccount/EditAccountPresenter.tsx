import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import PhotoInput from "src/Components/PhotoInput";
import styled from "src/typed-components";

const Container = styled.div``;

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
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <PhotoInput
      uploading={uploading}
      fileUrl={profilePhoto}
      onChange={onInputChange}
    />
    <ExtendedForm submitFn={onSubmit}>
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
      <Button onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
