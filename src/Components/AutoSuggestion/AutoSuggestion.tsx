import React from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import stacks from "../../stacks";
import "./AutoSuggestion.css";
import styled from "src/typed-components";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  return stacks.filter(stack => regex.test(stack.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const SuggestionContent = styled.div`
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
`;

const SuggestionImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Name = styled.span``;

const HighlightedName = styled.span`
  color: #ee0000;
  font-weight: bold;
`;

function renderSuggestion(suggestion, { query }) {
  const suggestionText = suggestion.name;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <SuggestionContent>
      <SuggestionImage src={suggestion.image} />
      {parts.map((part, index) => {
        console.log(part, index);
        return part.highlight ? (
          <>
            <HighlightedName key={index}>{part.text}</HighlightedName>
          </>
        ) : (
          <>
            <Name key={index}>{part.text}</Name>
          </>
        );
      })}
    </SuggestionContent>
  );
}

class App extends React.Component<any> {
  public state = {
    value: "",
    suggestions: []
  };

  public onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  public onSuggestionsFetchRequested = async ({ value }) => {
    await this.setState({
      suggestions: getSuggestions(value)
    });
  };

  public onSuggestionsClearRequested = async () => {
    await this.setState({
      suggestions: [],
      value: ""
    });
  };

  public componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  public render() {
    const { onInputChange, placeholder, clickfn } = this.props;
    const { suggestions, value } = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={(_, { suggestion }) => {
          onInputChange({ target: { value: suggestion.name } }, "stack").then(
            () => clickfn()
          );
          console.log({ target: { value: suggestion.name } }, "selected!");
        }}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default App;
