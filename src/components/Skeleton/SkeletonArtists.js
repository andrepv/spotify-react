import React from "react";
import PropTypes from "prop-types";

import SkeletonBlockHeader from "./SkeletonBlockHeader";
import "styles/Skeleton.scss";

export default function SkeletonArtists(props) {
  const {
    containerClassName = "artists",
    itemCount = 10,
    headerWithDescription,
  } = props;
  return (
    <section className={`skeleton_${containerClassName}`}>
      <SkeletonBlockHeader description={headerWithDescription} />
      <div className="skeleton__container">
        {[...Array(itemCount).keys()].map((item, index) => {
          return (
            <div className="skeleton__artist" key={index}>
              <div className="skeleton__artist-image pulse-bg"></div>
              <div className="skeleton__artist-title pulse-bg"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

SkeletonArtists.propTypes = {
  headerWithDescription: PropTypes.bool,
  itemCount: PropTypes.number,
  containerClassName: PropTypes.string,
};