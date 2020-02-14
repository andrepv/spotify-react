import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ARTIST } from "constants/RouteConstants";

export default class AuthorList extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.authors !== nextProps.authors;
  }

  render() {
    const {authors, handler} = this.props;
    return authors.map((author, index) => {
      return (
        <React.Fragment key={author.id}>
          <Link to={`${ARTIST}/${author.id}`}>
            <span onClick={handler}>
              {author.name}
            </span>
          </Link>
          {index + 1 !== authors.length && ", "}
        </React.Fragment>
      );
    });
  }
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  handler: PropTypes.func,
};