import React from "react";
import RecommendCreatePresenter from "./RecommendCreatePresenter";
import { Mutation } from "react-apollo";
import { createRecommend, createRecommendVariables } from "src/types/api";
import { CREATE_RECOMMEND } from "./RecommendCreateQueries";
import { toast } from "react-toastify";
import { GET_USER_PROFILE } from "../UserDetail/UserDetailQueries";

class CreateRecommendMutation extends Mutation<
  createRecommend,
  createRecommendVariables
> {}

class RecommendCreateContainer extends React.Component<any> {
  public state = {
    content: ""
  };

  public render() {
    const { onInputChange, onMutationCompleted } = this;
    const { content } = this.state;
    console.log(this.props);
    const {
      params: { id }
    } = this.props.match;
    return (
      <CreateRecommendMutation
        mutation={CREATE_RECOMMEND}
        variables={{ content, receiverId: Number(id) }}
        onCompleted={onMutationCompleted}
        refetchQueries={[
          {
            query: GET_USER_PROFILE,
            variables: { id: Number(id) }
          }
        ]}
      >
        {createFn => (
          <RecommendCreatePresenter
            content={content}
            onInputChange={onInputChange}
            createFn={createFn}
          />
        )}
      </CreateRecommendMutation>
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
    if ("CreateRecommend" in data) {
      const {
        CreateRecommend: { ok, error }
      } = data;
      const {
        params: { id }
      } = this.props.match;
      if (ok) {
        toast.success("Successfully Created Recommend!");
        this.props.history.push(`/users/${id}`);
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default RecommendCreateContainer;
