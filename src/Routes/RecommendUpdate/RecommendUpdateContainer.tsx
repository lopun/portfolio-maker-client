import React from "react";
import RecommendUpdatePresenter from "./RecommendUpdatePresenter";
import { Mutation, Query } from "react-apollo";
import {
  updateRecommend,
  updateRecommendVariables,
  getRecommend,
  getRecommendVariables
} from "src/types/api";
import { GET_RECOMMEND, UPDATE_RECOMMEND } from "./RecommendUpdateQueries";
import { toast } from "react-toastify";

class UpdateRecommendMutation extends Mutation<
  updateRecommend,
  updateRecommendVariables
> {}

class GetRecommendQuery extends Query<getRecommend, getRecommendVariables> {}

class RecommendUpdateContainer extends React.Component<any> {
  public state = {
    content: "",
    receiverId: null
  };

  public render() {
    const { onInputChange, onMutationCompleted, onQueryCompleted } = this;
    const { content } = this.state;
    console.log(this.props);
    const {
      params: { id: stringId }
    } = this.props.match;
    const id = Number(stringId);
    return (
      <GetRecommendQuery
        query={GET_RECOMMEND}
        variables={{ id }}
        onCompleted={onQueryCompleted}
      >
        {() => (
          <UpdateRecommendMutation
            mutation={UPDATE_RECOMMEND}
            variables={{ id, content }}
            onCompleted={onMutationCompleted}
          >
            {updateFn => (
              <RecommendUpdatePresenter
                content={content}
                onInputChange={onInputChange}
                updateFn={updateFn}
              />
            )}
          </UpdateRecommendMutation>
        )}
      </GetRecommendQuery>
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

  public onQueryCompleted = data => {
    if ("GetRecommend" in data) {
      const {
        GetRecommend: { ok, error, recommend }
      } = data;
      if (ok) {
        const { content, receiverId } = recommend;
        this.setState({
          content,
          receiverId
        });
      } else if (error) {
        toast.error(error);
      }
    }
  };

  public onMutationCompleted = data => {
    if ("UpdateRecommend" in data) {
      const {
        UpdateRecommend: { ok, error }
      } = data;
      const { receiverId } = this.state;
      if (ok) {
        toast.success("Successfully Updated!");
        this.props.history.push(`/users/${receiverId}`);
      } else if (error) {
        toast.error(error);
      }
    }
  };
}

export default RecommendUpdateContainer;
