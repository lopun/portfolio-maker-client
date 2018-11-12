import React from "react";
import ProjectEditPresenter from "./ProjectEditPresenter";
import { updateProject, updateProjectVariables, getProject, deleteProject, deleteProjectVariables } from "src/types/api";
import { Query, Mutation } from "react-apollo";
import { GET_PROJECT } from "src/sharedQueries";
import {UPDATE_PROJECT, DELETE_PROJECT} from "./ProjectEditQueries";
import { toast } from "react-toastify";

class GetProjectQuery extends Query<getProject> {}

class UpdateProjectMutation extends Mutation<
  updateProject,
  updateProjectVariables
> {}

class DeleteProjectMutation extends Mutation<
  deleteProject,
  deleteProjectVariables
>{}

class ProjectEditContainer extends React.Component<any> {
  public state = {
    name: "",
    content: "",
    projects: [],
    stack: [],
    currentStack: "",
    gitNickname: "",
    loading: false
  };

  public render() {
    const {
      name,
      content,
      stack,
      currentStack
    } = this.state;
    const {
      onInputChange,
      updateFields,
      onStack,
      stackFilter,
      cleanState,
      onMutationCompleted
    } = this;
    const { id } = this.props.match.params;
    return (
      <GetProjectQuery
        query={GET_PROJECT}
        onCompleted={data => updateFields(data)}
        variables={{ id: Number(id) }}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <UpdateProjectMutation
            mutation={UPDATE_PROJECT}
            variables={{id: Number(id), name, content, stack}}
            onCompleted={onMutationCompleted}
          >
          {(updateFn) => (
            <DeleteProjectMutation
              mutation={DELETE_PROJECT}
              variables={{id: Number(id)}}
            >
            {(deleteFn) => (<ProjectEditPresenter
              content={content}
              name={name}
              stack={stack}
              currentStack={currentStack}
              onInputChange={onInputChange}
              updateFn={updateFn}
              deleteFn={deleteFn}
              onStack={onStack}
              stackFilter={stackFilter}
              cleanState={cleanState}
            />)}
            </DeleteProjectMutation>
          )}
        </UpdateProjectMutation>
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
          this.setState({
            content,
            name,
            stack
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

  public onMutationCompleted = data => {
    if ("UpdateProject" in data) {
      const {
        UpdateProject: { ok, error }
      } = data;
      if (ok) {
        toast.success("Good, successfully updated");
        this.props.history.push("/");
      } else if (error) {
        toast.error(error);
      }
    }
  };

  public onInputChange = async event => {
    const {
      target: { name, value }
    } = event;
    if (name === "stack") {
      this.setState({
        currentStack: value
      } as any);
    } else {
      this.setState({
        [name]: value
      } as any);
    }
  };

  public cleanState = () => {
    this.setState({
      name: "",
      content: "",
      projects: [],
      stack: [],
      currentStack: ""
    });
  };

  public stackFilter = async name => {
    const { stack } = this.state;
    const filteredStack = stack.filter(item => item !== name);
    await this.setState({
      stack: filteredStack
    });
  };
}

export default ProjectEditContainer;
