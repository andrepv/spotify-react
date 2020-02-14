import React from "react";

import SkeletonBlockHeader from "./SkeletonBlockHeader";
import "styles/Skeleton.scss";

export default function SkeletonCategories({preview}) {
  return (
    <div className={`skeleton_${!preview
      ? "categories" : "categories-preview"
    }`}>
      <SkeletonBlockHeader description={preview} />
      <div className="skeleton__container">
        {[...Array(8).keys()].map((item, index) => {
          return (
            <div
              key={index}
              className="skeleton__category pulse-bg"
            ></div>
          );
        })}
      </div>
    </div>
  );
}