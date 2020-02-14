import React, { Component } from "react";
import PropTypes from "prop-types";
import EditableName from "./TracklistEditableName";

export default class Name extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name;
  }

  render() {
    const {name, changeName, isEditableName, focus} = this.props;
    if (isEditableName) {
      return (
        <EditableName
          changeName={changeName}
          name={name}
          focus={focus}
        />
      );
    }
    return <h2 className="tracklist__name">{name}</h2>;
  }
}

Name.propTypes = {
  name: PropTypes.string.isRequired,
  isEditableName: PropTypes.bool,
  changeName: PropTypes.func,
  focus: PropTypes.bool,
};