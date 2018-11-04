import React from "react";
import ResumeCreatePresenter from "./ResumeCreatePresenter";
import { Mutation } from "react-apollo";
import { createResume, createResumeVariables } from "src/types/api";
import { CREATE_RESUME } from "./ResumeCreateQueries";
import { toast } from "react-toastify";

class CreateResumeMutation extends Mutation<
  createResume,
  createResumeVariables
> {}

class ResumeCreateContainer extends React.Component<any> {
  public state = {
    name: "",
    content: ""
  };

  public render() {
    const { onInputChange, onMutationCompleted } = this;
    const { content, name } = this.state;
    return (
      <CreateResumeMutation
        mutation={CREATE_RESUME}
        variables={{ content, name }}
        onCompleted={onMutationCompleted}
      >
        {createFn => (
          <ResumeCreatePresenter
            content={content}
            name={name}
            onInputChange={onInputChange}
            createFn={createFn}
          />
        )}
      </CreateResumeMutation>
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

  public onMutationCompleted = data => {
    if ("CreateResume" in data) {
      const {
        CreateResume: { ok, error }
      } = data;
      if (ok) {
        toast.success("Successfully Created Resume!");
        this.props.history.push(`/`);
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default ResumeCreateContainer;
