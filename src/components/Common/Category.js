import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { CATEGORY_PLAYLISTS } from "constants/RouteConstants";
import LazyLoad from "components/Common/LazyLoad";
import "styles/Category.scss";

export default class Category extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  render() {
    const {id, image, name} = this.props;
    return (
      <Link
        to={`${CATEGORY_PLAYLISTS}/${id}`}
        className="category"
      >
        <LazyLoad className="category__cover-art">
          <div
           className="category__cover-art"
           style={{backgroundImage: `url(${image})`}}
          >
            <p className="category__name">{name}</p>
          </div>
        </LazyLoad>
      </Link>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
};