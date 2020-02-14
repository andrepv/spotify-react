import React, { Component } from "react";
import PropTypes from "prop-types";

import LikeButton from "components/Common/LikeButton";
import RepeatButton from "./buttons/RepeatButton";
import PrevButton from "./buttons/PrevButton";
import PlayButton from "./buttons/PlayButton";
import NextButton from "./buttons/NextButton";
import TrackInfo from "./PlayerTrackInfo";
import ProgressBar from "./PlayerProgressBar";
import VolumeControl from "./PlayerVolumeControl";
import { connectPlayer } from "containers/PlayerContainer";
import playerAPI from "utils/playerAPI";
import "styles/Player.scss";

export class Player extends Component {
  pauseTrack() {
    playerAPI.pauseTrack();
  }

  resumeTrack() {
    playerAPI.resumeTrack();
  }

  playPrevTrack() {
    playerAPI.playPrevTrack();
  }

  playNextTrack() {
    playerAPI.playNextTrack();
  }

  toggleRepeat() {
    playerAPI.toggleRepeat();
  }

  likeTrack = () => {
    const {trackPlaying, trackInfo} = this.props.player;
    trackPlaying && playerAPI.addToSavedTracks(trackInfo);
  }

  unlikeTrack = () => {
    const {playingTrackId} = this.props.player;
    playerAPI.removeFromSavedTracks(playingTrackId);
  }

  render() {
    const {trackPlaying, trackPaused, trackInfo, repeat} = this.props.player;
    return (
      <div className='player__wrapper flex-center'>
        <div className="player">
          <TrackInfo trackInfo={trackInfo} />
          <div className="player__body">
            <div className="player__control-panel">
              <div>
                <PrevButton playPrevTrack={this.playPrevTrack}/>
                <PlayButton
                  trackPlaying={trackPlaying}
                  trackPaused={trackPaused}
                  pauseTrack={this.pauseTrack}
                  resumeTrack={this.resumeTrack}
                />
                <NextButton playNextTrack={this.playNextTrack}/>
              </div>
              <ProgressBar />
            </div>
            <div className="player__additional-buttons">
              <VolumeControl />
              <LikeButton
                isActive={trackInfo.saved}
                like={this.likeTrack}
                unlike={this.unlikeTrack}
              />
              <RepeatButton
                repeat={repeat}
                toggleRepeat={this.toggleRepeat}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connectPlayer(Player);

Player.propTypes = {
  player: PropTypes.object.isRequired,
};