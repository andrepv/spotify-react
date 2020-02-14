import React, { Component } from "react";
import { X } from "react-feather";
import PropTypes from "prop-types";

export default class AlertMessage extends Component {
  componentDidMount() {
    setTimeout(this.remove, 3000);
  }

  remove = () => {
    this.props.remove(this.props.id);
  }

  render() {
    const {message} = this.props;
    return (
      <div className="alert__wrapper">
        <span className="alert__message">{message}</span>
        <span
          className="alert__close"
          onClick={this.remove}
        >
          <X/>
        </span>
      </div>
    );
  }
}

AlertMessage.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  remove: PropTypes.func.isRequired,
};