import React from "react";
import ProjectsPresenter from "./ProjectsPresenter";
import { Query, Mutation } from "react-apollo";
import {
  getProjectsById,
  createProject,
  createProjectVariables,
  crawlerVariables,
  crawler
} from "src/types/api";
import { GET_PROJECTS_BY_ID, CREATE_PROJECT, CRAWLER } from "./ProjectsQueries";
import { toast } from "react-toastify";

class GetProjectsByIdQuery extends Query<getProjectsById> {}

class CreateProjectMutation extends Mutation<
  createProject,
  createProjectVariables
> {}

class CrawlerMutation extends Mutation<crawler, crawlerVariables> {}

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
      gitNickname,
      loading
    } = this.state;
    const {
      onInputChange,
      updateFields,
      onStack,
      stackFilter,
      cleanState,
      onCrawlerCompleted
    } = this;
    return (
      <CrawlerMutation
        mutation={CRAWLER}
        variables={{ username: gitNickname }}
        refetchQueries={[{ query: GET_PROJECTS_BY_ID }]}
        onCompleted={onCrawlerCompleted}
      >
        {crawlerFn => (
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
                      onInputChange={onInputChange}
                      onStack={onStack}
                      stackFilter={stackFilter}
                      cleanState={cleanState}
                      gitNickname={gitNickname}
                      loading={loading}
                      createFn={async () => {
                        await this.setState({
                          loading: true
                        });
                        createFn();
                      }}
                      crawlerFn={crawlerFn}
                    />
                  )}
                </GetProjectsByIdQuery>
              );
            }}
          </CreateProjectMutation>
        )}
      </CrawlerMutation>
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

  public onCrawlerCompleted = async data => {
    console.log(data);
    if ("Crawler" in data) {
      const {
        Crawler: { ok, error }
      } = data;
      await this.setState({
        loading: false
      });
      if (ok) {
        toast.success("Successfully Crawlled!");
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default ProjectsContainer;
