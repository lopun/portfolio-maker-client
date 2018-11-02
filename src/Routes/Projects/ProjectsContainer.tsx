import React from "react";
import ProjectsPresenter from "./ProjectsPresenter";
import { Query, Mutation } from "react-apollo";
import {
  getProjectsById,
  createProject,
  createProjectVariables
} from "src/types/api";
import { GET_PROJECTS_BY_ID, CREATE_PROJECT } from "./ProjectsQueries";
import { toast } from "react-toastify";

class GetProjectsByIdQuery extends Query<getProjectsById> {}

class CreateProjectMutation extends Mutation<
  createProject,
  createProjectVariables
> {}

class ProjectsContainer extends React.Component<any> {
  public state = {
    name: "",
    content: "",
    projects: []
  };

  public render() {
    const { name, content, projects } = this.state;
    const { onInputChange, updateFields } = this;
    return (
      <CreateProjectMutation
        mutation={CREATE_PROJECT}
        variables={{ name, content }}
        refetchQueries={[{ query: GET_PROJECTS_BY_ID }]}
      >
        {createFn => (
          <GetProjectsByIdQuery
            query={GET_PROJECTS_BY_ID}
            onCompleted={updateFields}
          >
            {({ data }) => (
              <ProjectsPresenter
                name={name}
                content={content}
                projects={projects}
                createFn={createFn}
                onInputChange={onInputChange}
              />
            )}
          </GetProjectsByIdQuery>
        )}
      </CreateProjectMutation>
    );
  }

  public updateFields = async (data: {} | getProjectsById) => {
    console.log("Updated");
    if ("GetProjectsById" in data) {
      const {
        GetProjectsById: { ok, error, projects }
      } = data;
      if (ok) {
        if (projects !== null) {
          this.setState({
            projects
          });
        }
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
}

export default ProjectsContainer;
