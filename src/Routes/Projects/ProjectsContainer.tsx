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
    projects: [],
    stack: [],
    currentStack: ""
  };

  public render() {
    const { name, content, projects, stack, currentStack } = this.state;
    const { onInputChange, updateFields, onStack, stackFilter } = this;
    return (
      <CreateProjectMutation
        mutation={CREATE_PROJECT}
        variables={{ name, content, stack }}
        refetchQueries={[{ query: GET_PROJECTS_BY_ID }]}
      >
        {createFn => (
          <GetProjectsByIdQuery
            query={GET_PROJECTS_BY_ID}
            onCompleted={updateFields}
          >
            {() => (
              <ProjectsPresenter
                name={name}
                content={content}
                stack={stack}
                currentStack={currentStack}
                projects={projects}
                createFn={createFn}
                onInputChange={onInputChange}
                onStack={onStack}
                stackFilter={stackFilter}
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

  public onStack = async () => {
    const { stack, currentStack } = this.state;
    await this.setState({
      stack: [...stack, currentStack]
    });
    await this.setState({
      currentStack: ""
    });
  };

  public onInputChange = async (event, str) => {
    const {
      target: { name, value }
    } = event;
    if (str === "stack") {
      this.setState({
        currentStack: value
      } as any);
    } else {
      this.setState({
        [name]: value
      } as any);
    }
  };

  // public cleanState = () => {
  //   this.setState({
  //     name:
  //   })
  // }

  public stackFilter = async name => {
    const { stack } = this.state;
    const filteredStack = stack.filter(item => item !== name);
    await this.setState({
      stack: filteredStack
    });
  };
}

export default ProjectsContainer;
