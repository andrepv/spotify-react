import React from "react";
import PropTypes from "prop-types";

import SkeletonBlockHeader from "./SkeletonBlockHeader";
import "styles/Skeleton.scss";

export default function SkeletonTracks(props) {
  const {
    className = "songs",
    itemCount = 10,
    headerWithDescription,
    header,
  } = props;
  return (
    <section className={`skeleton_${className}`}>
      {header && <SkeletonBlockHeader description={headerWithDescription} />}
      <div className="skeleton__container">
        {[...Array(itemCount).keys()].map((item, index) => {
          return (
            <div className="skeleton__song" key={index}>
              <div className={`skeleton__song-image pulse-bg`}></div>
              <div className="skeleton__song-info">
                <div className="skeleton__song-title pulse-bg"></div>
                <div className="skeleton__song-subtitle pulse-bg"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

SkeletonTracks.propTypes = {
  headerWithDescription: PropTypes.bool,
  header: PropTypes.bool,
  itemCount: PropTypes.number,
  className: PropTypes.string,
};