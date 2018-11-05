import React from "react";
import ResumeEditPresenter from "./ResumeEditPresenter";
import { Mutation, Query } from "react-apollo";
import { updateResume, updateResumeVariables, getResume } from "src/types/api";
import { UPDATE_RESUME } from "./ResumeEditQueries";
import { toast } from "react-toastify";
import { GET_RESUME } from "src/sharedQueries";

class UpdateResumeMutation extends Mutation<
  updateResume,
  updateResumeVariables
> {}

class GetResumeQuery extends Query<getResume> {}

class ResumeEditContainer extends React.Component<any> {
  public state = {
    name: "",
    content: ""
  };

  public render() {
    const { updateFileds, onInputChange, onMutationCompleted } = this;
    const { id } = this.props.match.params;
    const { name, content } = this.state;
    return (
      <GetResumeQuery
        query={GET_RESUME}
        onCompleted={data => updateFileds(data)}
        variables={{ id: Number(id) }}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <UpdateResumeMutation
            mutation={UPDATE_RESUME}
            variables={{ id: Number(id), name, content }}
            onCompleted={onMutationCompleted}
          >
            {updateFn => (
              <ResumeEditPresenter
                name={name}
                content={content}
                onInputChange={onInputChange}
                updateFn={updateFn}
              />
            )}
          </UpdateResumeMutation>
        )}
      </GetResumeQuery>
    );
  }

  public onMutationCompleted = data => {
    if ("UpdateResume" in data) {
      const {
        UpdateResume: { ok, error }
      } = data;
      if (ok) {
        toast.success("Good, successfully updated");
        this.props.history.push("/");
      } else if (error) {
        toast.error(error);
      }
    }
  };

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

  public updateFileds = (data: getResume | {}) => {
    if ("GetResume" in data) {
      const {
        GetResume: { ok, error, resume }
      } = data;
      if (ok) {
        if (resume) {
          const { content, name } = resume;
          this.setState({
            content,
            name
          });
        }
      } else if (error) {
        toast.error(error);
      }
    }
  };
}
export default ResumeEditContainer;
