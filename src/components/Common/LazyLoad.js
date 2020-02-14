import React, { Component } from "react";
import PropTypes from "prop-types";
import isIntersectionObserverAvailable from "utils/intersectionObserver";

export default class LazyLoad extends Component {
  state = {
    loaded: false,
  }

  load = () => {
    this.setState({
      loaded: true,
    });
  }

  componentDidMount() {
    if (!isIntersectionObserverAvailable() || this.state.loaded) {
      return;
    }
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.load();
            this.observer = this.observer.disconnect();
          }
        });
      }
    );
    this.observer.observe(this.placeholder);
  }

  componentWillUnmount() {
    if (this.placeholder && this.observer) {
      this.observer.unobserve(this.placeholder);
    }
  }

  render() {
    const {children, className} = this.props;
    if (this.state.loaded || !isIntersectionObserverAvailable()) {
      return children;
    }
    return (
      <div
        ref={el => (this.placeholder = el)}
        className={`lazyload-placeholder ${className}`}
      ></div>
    );
  }
}

LazyLoad.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};