import React from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

export default function BlockHeader(props) {
  const {title = "", description = "", link, button = ""} = props;
  return (
    <header className="block-header">
      <div className="block-header__title-box">
        <p className="block-header__description">{description}</p>
        <h3 className="block-header__title">{title}</h3>
      </div>
      {link && <div className="block-header__link">
        <Link to={link}>
          see all <ArrowRight/>
        </Link>
      </div>}
      {button}
    </header>
  );
}

BlockHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  button: PropTypes.object,
};