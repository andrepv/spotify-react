import React from "react";
import PropTypes from "prop-types";

import "styles/Skeleton.scss";
import SkeletonBlockHeader from "./SkeletonBlockHeader";

export default function SkeletonBlocks(props) {
  const {
    className = "grid",
    itemCount = 8,
    headerWithDescription,
  } = props;
  return (
    <section className='skeleton_blocks'>
      <SkeletonBlockHeader description={headerWithDescription} />
      <div className={`
        skeleton__blocks-container
        skeleton__blocks-container_${className}`
      }>
        {[...Array(itemCount).keys()].map((item, index) => {
          return (
            <div className="skeleton__block" key={index}>
              <div className="skeleton__block-image pulse-bg"></div>
              <div className="skeleton__block-title pulse-bg"></div>
              <div className="skeleton__block-subtitle pulse-bg"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

SkeletonBlocks.propTypes = {
  headerWithDescription: PropTypes.bool,
  itemCount: PropTypes.number,
  className: PropTypes.string,
};