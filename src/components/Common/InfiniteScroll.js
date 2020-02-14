import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Loader } from "images/loader.svg";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.container = this.props.containerSelector
        ? document.querySelector(this.props.containerSelector)
        : window;
      if (!this.container) {
        return;
      }
      this.container.addEventListener("scroll", this.handleOnScroll);
      this.container.addEventListener("resize", this.handleOnScroll);
    }, 500)
  }

  componentWillUnmount() {
    if (!this.container) {
      return;
    }
    this.container.removeEventListener("scroll", this.handleOnScroll);
    this.container.removeEventListener("resize", this.handleOnScroll);
  }

  handleOnScroll() {
    const {
      disable,
      containerSelector,
      dataLength,
      total,
      loadData,
      pending,
    } = this.props;
    if (disable) {
      return;
    }
    const element = containerSelector
      ? this.container
      : document.documentElement;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && dataLength < total) {
      !pending && loadData();
    }
  }

  render() {
    const {children, pending, hideLoader} = this.props;
    return (
      <div>
        {children}
        {pending && !hideLoader && <div className="loader"><Loader/></div>}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  containerSelector: PropTypes.string,
  dataLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  loadData: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  disable: PropTypes.bool,
  hideLoader: PropTypes.bool,
};