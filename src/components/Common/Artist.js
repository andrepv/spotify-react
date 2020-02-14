import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import musician from "images/musician.png";
import { ARTIST } from "constants/RouteConstants";
import LazyLoad from "components/Common/LazyLoad";
import "styles/Artist.scss";

export default class Artist extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  render() {
    const {image, id, handler, name} = this.props;
    return (
      <div className="artist">
        <LazyLoad className="artist__pic">
          <div
            className={`artist__pic artist__pic_root bg-${
              !image ? "empty" : "center"
            }`}
            style={{backgroundImage: `url(${image || musician})`}}
          ></div>
        </LazyLoad>
        <Link
          to={`${ARTIST}/${id}`}
          className="artist__name"
        >
          <span onClick={handler}>
            {name}
          </span>
        </Link>
      </div>
    );
  }
}

Artist.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  handler: PropTypes.func,
};