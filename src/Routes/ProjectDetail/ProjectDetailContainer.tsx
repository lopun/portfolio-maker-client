import React from "react";
import ProjectDetailPresenter from "./ProjectDetailPresenter";
import { getProject } from "src/types/api";
import { Query } from "react-apollo";
import { GET_PROJECT } from "src/sharedQueries";
import { toast } from "react-toastify";

class GetProjectQuery extends Query<getProject> {}

class ProjectDetailContainer extends React.Component<any> {
  public state = {
    name: "",
    content: "",
    stack: []
  };

  public render() {
    const { updateFields } = this;
    const { id } = this.props.match.params;
    const { name, content, stack } = this.state;
    return (
      <GetProjectQuery
        query={GET_PROJECT}
        onCompleted={data => updateFields(data)}
        variables={{ id: Number(id) }}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <ProjectDetailPresenter name={name} content={content} stack={stack} />
        )}
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
          const { content, name, stack } = project;
          console.log(data);
          this.setState({
            content,
            name,
            stack: stack === undefined ? [] : stack
          });
        }
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default ProjectDetailContainer;
