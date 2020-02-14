import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import cd from "images/cd.png";
import AuthorList from "components/Common/AuthorList";
import LazyLoad from "components/Common/LazyLoad";
import "styles/Block.scss";

export default class Block extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.name !== nextProps.name ||
      this.props.image !== nextProps.image ||
      this.props.meta !== nextProps.meta
    );
  }

  render() {
    const {name = "", id, image, meta, type, handler} = this.props;
    return (
      <div className="block">
        <div className="block__media">
          <LazyLoad className="block__img">
            <div
              className={`block__img block__img_root bg-${
                !image ? "empty" : "center"
              }`}
              style={{backgroundImage: `url(${image || cd})`}}
            ></div>
          </LazyLoad>
        </div>
        <div className="block__content">
          <Link to={{
            pathname: `/${type}/${id}`,
            state: {modal: true, type},
          }}>
            <span
              className="block__title"
              onClick={handler}
            >
              {name}
            </span>
          </Link>
          <p className="block__subtitle">
            {
              type === "album"
              ? <AuthorList authors={meta} handler={handler}/>
              : meta
            }
          </p>
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  meta: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handler: PropTypes.func,
};