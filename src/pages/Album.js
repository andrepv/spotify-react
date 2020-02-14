import React, { Component } from "react";
import PropTypes from "prop-types";

import PlayButton from "./Tracklist/TracklistPlayButton";
import Image from "./Tracklist/TracklistImage";
import Name from "./Tracklist/TracklistName";
import AuthorList from "components/Common/AuthorList";
import Tracks from "components/Common/Tracks";
import Page404 from "pages/Page404";
import LikeButton from "components/Common/LikeButton";
import { connectAlbum } from "containers/Album/AlbumContainer";
import { ReactComponent as Loader } from "images/loader.svg";

export class Album extends Component {
  componentDidMount() {
    const {id, loadAlbum} = this.props;
    if (this.props.album.id !== id) {
      loadAlbum(id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.loadAlbum(this.props.id);
    }
  }

  addToMySavedAlbums = () => {
    const {addToMySavedAlbums, id} = this.props;
    addToMySavedAlbums(id);
  }

  removeFromMySavedAlbums = () => {
    const {removeFromMySavedAlbums, id} = this.props;
    removeFromMySavedAlbums(id);
  }

  render() {
    const {album, tracks, id} = this.props;
    const source = {name: `album_${id}`};
    if (album.pending || album.error) {
      return <div className="tracklist__loader flex-center"><Loader /></div>;
    }
    if (!album.id) {
      return <Page404 />;
    }
    return (
      <div className="tracklist__container custom-scrollbar">
        <header className="tracklist__header">
          <Image image={album.image} />
          <div className="tracklist__info">
            <div className="tracklist__authors">
              <AuthorList authors={album.authors}/>
            </div>
            <Name name={album.name} />
            <ul className="tracklist__additional-info">
              <li>{album.date}</li>
              <li className="tracklist__dot"> • </li>
              <li>{album.totalTracks}</li>
            </ul>
            <div className="tracklist__buttons">
              <PlayButton
                type="album"
                id={id}
                disabled={!album.isAvailableForPreview}
                trackList={tracks}
              />
              <LikeButton
                like={this.addToMySavedAlbums}
                unlike={this.removeFromMySavedAlbums}
                isActive={album.isSaved}
              />
            </div>
          </div>
        </header>
        <div className="tracklist">
          <Tracks
            trackList={tracks}
            source={source}
          />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
  tracks: PropTypes.array.isRequired,
  loadAlbum: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  addToMySavedAlbums: PropTypes.func.isRequired,
  removeFromMySavedAlbums: PropTypes.func.isRequired,
};

export default connectAlbum(Album);