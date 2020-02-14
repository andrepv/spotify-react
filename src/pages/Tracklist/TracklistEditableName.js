import React, { Component } from "react";
import PropTypes from "prop-types";

export default class EditableName extends Component {
  state = {
    name: this.props.name,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.name !== this.state.name;
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.setState({
        name: this.props.name,
      });
    }
  }

  handleInputChange = event => {
    this.setState({
      name: event.target.value,
    });
  }

  handleInputBlur = () => {
    const {name, changeName} = this.props;
    if (!this.state.name.length) {
      this.setState({
        name: name,
      });
      return;
    } else if (this.state.name === name) {
      return;
    }
    changeName({
      name: this.state.name.trim(),
    });
  }

  render() {
    const {focus} = this.props;
    return (
      <input
        ref={input => (input && focus && input.focus())}
        type="text"
        maxLength="40"
        className="tracklist__name tracklist__name_edit
        tracklist__editable-field"
        onChange={this.handleInputChange}
        value={this.state.name}
        onBlur={this.handleInputBlur}
      />
    );
  }
}

EditableName.propTypes = {
  changeName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  focus: PropTypes.bool,
};