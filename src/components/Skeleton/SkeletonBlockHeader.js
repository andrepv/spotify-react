import React from "react";

export default function SkeletonBlockHeader({description}) {
  return (
    <div className="skeleton__header">
      {description && <div className="skeleton__description pulse-bg"></div>}
      <div className="skeleton__title pulse-bg"></div>
    </div>
  );
}