import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OpenContextMenuButton extends Component {
  constructor(props) {
    super(props);
    this.toggleContextMenu = this.toggleContextMenu.bind(this);
    this.closeContextMenu = this.closeContextMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    isContextMenuOpen: false,
  }

  componentWillUnmount() {
    this.detachEventListeners();
  }

  handleClickOutside(e) {
    if (!this.button.contains(e.target)) {
      this.closeContextMenu();
    }
  }

  toggleContextMenu() {
    this.setState({
      isContextMenuOpen: !this.state.isContextMenuOpen,
    });
    if (!this.state.isContextMenuOpen) {
      this.attachEventListeners();
    } else {
      this.detachEventListeners();
    }
  }

  closeContextMenu() {
    this.setState({
      isContextMenuOpen: false,
    });
    this.detachEventListeners();
  }

  attachEventListeners() {
    document.addEventListener("click", this.handleClickOutside);
    window.addEventListener("scroll", this.closeContextMenu);
  }

  detachEventListeners() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("scroll", this.closeContextMenu);
  }

  render() {
    const {renderContent, renderContextMenu, className = ""} = this.props;
    const {isContextMenuOpen} = this.state;
    const btnClassName = `more-btn ${className} ${
      isContextMenuOpen ? "more-btn_active" : ""
    }`;
    return (
      <button
        className={btnClassName}
        ref={el => (this.button = el)}
      >
        {renderContent(this.toggleContextMenu)}
        {isContextMenuOpen && renderContextMenu(this.closeContextMenu)}
      </button>
    );
  }
}

OpenContextMenuButton.propTypes = {
  renderContextMenu: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  className: PropTypes.string,
};