import React, { Component } from "react";
import PropTypes from "prop-types";

import Columns from "./Columns";
import Track from "./Track/Track";
import playerAPI from "utils/playerAPI";
import { connectPlayer } from "containers/PlayerContainer";
import "styles/Tracks.scss";

export class Tracks extends Component {
  shouldComponentUpdate(nextProps) {
    const {player, trackList, source} = this.props;
    return (
      nextProps.player.playingTrackId !== player.playingTrackId ||
      nextProps.trackList !== trackList ||
      nextProps.source.name !== source.name
    );
  }

  componentDidUpdate(prevProps) {
    const {player, source, trackList} = this.props;
    if (player.context.name !== source.name) {
     return;
    }
    if (player.context.tracks.length < trackList.length) {
      playerAPI.updateContext(trackList);
    }
  }

  render() {
    const {playingTrackId, context} = this.props.player;
    const {
      trackList,
      columns = 1,
      source,
      charts,
      removeTrackFromPlaylist,
    } = this.props;
    return (
      <Columns amount={columns}>
        {trackList.map((item, index) => {
          let track = {
            ...item,
            isActive: item.id === playingTrackId &&
                      context.name === source.name,
            key: index + 1,
          };
          return (
            <Track
              key={index}
              track={track}
              trackList={trackList}
              source={source}
              charts={charts}
              removeTrackFromPlaylist={removeTrackFromPlaylist}
            />
          );
        })}
      </Columns>
    );
  }
}

export default connectPlayer(Tracks);

Tracks.propTypes = {
  trackList: PropTypes.array.isRequired,
  source: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  columns: PropTypes.number,
  removeTrackFromPlaylist: PropTypes.func,
  charts: PropTypes.bool,
};