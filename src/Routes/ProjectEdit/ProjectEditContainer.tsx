import React from "react";
import ProjectEditPresenter from "./ProjectEditPresenter";
import { getProject } from "src/types/api";
import { Query } from "react-apollo";
import { GET_PROJECT } from "src/sharedQueries";
import { toast } from "react-toastify";

class GetProjectQuery extends Query<getProject> {}

class ProjectEditContainer extends React.Component<any> {
  public state = {
    name: "",
    content: ""
  };

  public render() {
    const { updateFields } = this;
    const { id } = this.props.match.params;
    const { name, content } = this.state;
    return (
      <GetProjectQuery
        query={GET_PROJECT}
        onCompleted={data => updateFields(data)}
        variables={{ id: Number(id) }}
      >
        {() => <ProjectEditPresenter name={name} content={content} />}
      </GetProjectQuery>
    );
  }

  public updateFields = (data: getProject | {}) => {
    if ("GetProject" in data) {
      const {
        GetProject: { ok, error, project }
      } = data;
      if (ok) {
        if (project) {
          const { content, name } = project;
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

export default ProjectEditContainer;