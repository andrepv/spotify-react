import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Clef } from "images/clef.svg";

export default function EmptyPage(props) {
  const {title, button = null} = props;
  return (
    <div className="empty-page flex-center">
      <div>
        <div className="empty-page__icon">
          <Clef />
        </div>
        <h3 className="empty-page__title">{title}</h3>
        {button}
      </div>
    </div>
  );
}

EmptyPage.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.element,
};