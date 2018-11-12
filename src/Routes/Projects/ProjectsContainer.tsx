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
import Axios from "axios";

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
    currentStack: "",
    gitNickname: "",
    loading: false
  };

  public render() {
    const {
      name,
      content,
      projects,
      stack,
      currentStack,
      gitNickname
    } = this.state;
    const {
      onInputChange,
      updateFields,
      onStack,
      stackFilter,
      cleanState,
      gitCroller
    } = this;
    return (
      <CreateProjectMutation
        mutation={CREATE_PROJECT}
        variables={{ name, content, stack }}
        refetchQueries={[{ query: GET_PROJECTS_BY_ID }]}
      >
        {createFn => {
          return (
            <GetProjectsByIdQuery
              query={GET_PROJECTS_BY_ID}
              onCompleted={updateFields}
              fetchPolicy={"cache-and-network"}
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
                  cleanState={cleanState}
                  gitNickname={gitNickname}
                  gitCroller={gitCroller}
                />
              )}
            </GetProjectsByIdQuery>
          );
        }}
      </CreateProjectMutation>
    );
  }

  public updateFields = async (data: {} | getProjectsById) => {
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

  public gitCroller = async createFn => {
    const { gitNickname } = this.state;
    if (gitNickname === "") {
      toast.error("You should fill in the name!");
    } else {
      if (
        confirm(
          "Are you sure that you want to croll all your projects from Github?"
        )
      ) {
        await this.setState({
          loading: true
        });
        const url =
          process.env.NODE_ENV === "development"
            ? `http://localhost:4000/croller/${gitNickname}`
            : `https://portfolio-maker-server.lopun.org/croller/${gitNickname}`;
        await Axios({
          method: "get",
          url
        }).then(async response => {
          let result;
          const { data } = response;
          if (data) {
            // tslint:disable-next-line
            for (result of data) {
              await this.setState({
                content: `## ${result.title}`,
                stack: [result.stack],
                name: result.title
              });
              await createFn();
            }
            this.setState({
              content: "",
              stack: [],
              name: ""
            });
          }
        });
        this.setState({
          loading: false
        });
        toast.success("Successfully Crolled!");
      } else {
        toast.error("You canceled to croll!");
      }
    }
  };
}

export default ProjectsContainer;
