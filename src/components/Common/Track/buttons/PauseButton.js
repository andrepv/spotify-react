import React from "react";

import { Pause } from "react-feather";
import playerAPI from "utils/playerAPI";

export default function PauseButton() {
  return (
    <span
      onClick={() => playerAPI.pauseTrack()}
      className="track__icon"
    >
      <Pause className="track__icon-pause"/>
    </span>
  );
}