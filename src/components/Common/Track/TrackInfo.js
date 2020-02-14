import React from "react";
import PropTypes from "prop-types";

import AuthorList from "components/Common/AuthorList";

export default function TrackInfo(props) {
  const {charts, track, children} = props;
  return (
    <React.Fragment>
      {charts &&
        <span className="track__chart-number">
          {`${track.key < 10 ? "0" + track.key : track.key}`}
        </span>
      }
      <div className="track__info">
        <div className="track__info-wrapper">
          <p className="track__title">{track.name}</p>
          <p className="track__authors">
            <AuthorList authors={track.authors}/>
          </p>
        </div>
        <p className="track__duration">{track.duration}</p>
        {children}
      </div>
    </React.Fragment>
  );
}

TrackInfo.propTypes = {
  track: PropTypes.object.isRequired,
  charts: PropTypes.bool,
};