import { Component } from "react";
import {
  SearchbarContainer,
  SearchbarInput,
  SearchForm,
  SearchFormButton,
} from "./Searchbar.styled";

export default class Searchbar extends Component {
  state = {
    input: "",
  };

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm
          onSubmit={(e) => this.props.handleSubmit(e, this.state.input)}
        >
          <SearchFormButton type="submit" />
          <SearchbarInput
            onChange={this.handleInput}
            value={this.state.input}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}
