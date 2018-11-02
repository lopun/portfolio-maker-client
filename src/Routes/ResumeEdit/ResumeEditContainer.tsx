import React from "react";
import ResumeEditPresenter from "./ResumeEditPresenter";
import { getResume } from "src/types/api";
import { Query } from "react-apollo";
import { GET_RESUME } from "src/sharedQueries";
import { toast } from "react-toastify";

class GetResumeQuery extends Query<getResume> {}

class ResumeEditContainer extends React.Component<any> {
  public state = {
    name: "",
    content: ""
  };

  public render() {
    const { updateFields } = this;
    const { id } = this.props.match.params;
    const { name, content } = this.state;
    return (
      <GetResumeQuery
        query={GET_RESUME}
        onCompleted={data => updateFields(data)}
        variables={{ id: Number(id) }}
      >
        {() => <ResumeEditPresenter name={name} content={content} />}
      </GetResumeQuery>
    );
  }

  public updateFields = (data: getResume | {}) => {
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
