import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
  }

  state = {
    totalPages: 0,
    currentPageNum: 0,
    menuHeight: 0,
  }

  componentDidMount() {
    let {currentPageNum, totalPages} = this.props;
    this.menu && this.setState({menuHeight: this.menu.offsetHeight});
    if (currentPageNum && totalPages) {
      this.setState({currentPageNum, totalPages});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.menu.offsetHeight !== prevState.menuHeight) {
      this.setState({menuHeight: this.menu.offsetHeight});
    }
  }

  navigateToPage = (page = 1) => {
    setTimeout(() => {
      this.setState({
        currentPageNum: page,
      });
    }, 200);
  }

  getRef(el) {
    this.menu = el;
  }

  getOffsetTop() {
    const {defaultTop, getOffsetTop, containerRef} = this.props;
    if (!containerRef) {
     return;
    }
    const menuHeight = this.state.menuHeight;
    const containerBottom = containerRef.getBoundingClientRect().bottom;
    const offsetTop = getOffsetTop(menuHeight);
    const top = menuHeight + containerBottom > window.innerHeight
      ? offsetTop
      : defaultTop;
    return `${top}px`;
  }

  render() {
    const {renderContent} = this.props;
    return (
      <div
        className="context-menu"
        ref={this.getRef}
        style={{top: this.getOffsetTop()}}
      >
        {renderContent(this.state.currentPageNum, this.navigateToPage)}
      </div>
    );
  }
}

ContextMenu.propTypes = {
  currentPageNum: PropTypes.number,
  totalPages: PropTypes.number,
  containerRef: PropTypes.object,
  renderContent: PropTypes.func.isRequired,
  defaultTop: PropTypes.number,
  getOffsetTop: PropTypes.func,
};