import React, { Component } from "react";
import PropTypes from "prop-types";

import PlayButton from "./buttons/PlayButton";
import PauseButton from "./buttons/PauseButton";
import LazyLoad from "components/Common/LazyLoad";
import { connectPlayer } from "containers/PlayerContainer";

export class CoverImage extends Component {
  shouldComponentUpdate(nextProps) {
    const {track, player} = this.props;
    return (
      track.image !== nextProps.track.image ||
      track.isActive !== nextProps.track.isActive ||
      (track.isActive && player.trackPaused !== nextProps.player.trackPaused)
    );
  }

  render() {
    const {track, trackContext, player} = this.props;
    const isAlbum = trackContext && trackContext.name.includes("album");
    return (
      <div className={`
        track__cover-art flex-center 
        ${!isAlbum ? "track__cover-art_has-image" : ""}
      `}>
        {!player.trackPaused && track.isActive
          ? <PauseButton />
          : <PlayButton track={track} context={trackContext}/>
        }
        {!isAlbum &&
          <LazyLoad className="track__cover-art-image">
            <img
              className="track__cover-art-image"
              src={track.image || ""}
              alt=""
            />
          </LazyLoad>
        }
      </div>
    );
  }
}

CoverImage.propTypes = {
  track: PropTypes.object.isRequired,
  trackContext: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};

export default connectPlayer(CoverImage);