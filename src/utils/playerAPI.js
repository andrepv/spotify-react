import { store } from "store/configureStore";
import {
  playTrack,
  pauseTrack,
  resumeTrack,
  setContext,
  updateContext,
  changeCurrentTime,
  toggleReapeat,
} from "actions/PlayerActions";
import {
  addToFavoriteTracks,
  removeFromFavoriteTracks,
} from "actions/TrackActions";

class PlayerAPI {
  constructor() {
    this.audio = new Audio();
    this._blockTimeUpdate = false;
    this._repeat = false;
    this.audio.addEventListener("ended", () => this.audioOnFinish());
    this.audio.addEventListener("timeupdate", () => this.timeUpdate());
  }

  resumeTrack() {
    store.dispatch(resumeTrack());
    this.audio.play();
  }

  pauseTrack() {
    store.dispatch(pauseTrack());
    this.audio.pause();
  }

  playTrack(track, context) {
    store.dispatch(playTrack(track));

    if (!track.preview_url) {
      this.playNextTrack();
      return;
    }

    this.setContext(context);
    this.loadTrack(track.preview_url);
    this.audio.play();
  }

  playNextTrack() {
    if (!store.getState().player.trackPlaying) {
      return;
    }

    const {context, playingTrackId} = store.getState().player;
    const currentTrackIndex = context.tracks.findIndex(track => {
      return track.id === playingTrackId;
    });
    const nextAvailableTrackIndex = context.tracks.findIndex((track, index) => {
      return index > currentTrackIndex && track.preview_url;
    });
    const nextTrack = context.tracks[nextAvailableTrackIndex];

    if (nextAvailableTrackIndex === -1) {
      let firstAvailableTrackIndex = context.tracks.findIndex(track => {
        return track.preview_url;
      });
      this.playTrack(context.tracks[firstAvailableTrackIndex]);
      this.pauseTrack();
    } else {
      this.playTrack(nextTrack);
    }
  }

  playPrevTrack() {
    if (!store.getState().player.trackPlaying) {
      return;
    }

    const {context, playingTrackId} = store.getState().player;
    const currentTrackIndex = context.tracks.findIndex(track => {
      return track.id === playingTrackId;
    });
    const prevTrack = context.tracks[currentTrackIndex - 1];

    if (prevTrack && prevTrack.preview_url) {
      this.playTrack(prevTrack);
    }
  }

  startOver() {
    this.audio.play();
  }

  setContext(context) {
    const currentContextName = store.getState().player.context.name;
    if (context && context.name !== currentContextName) {
      store.dispatch(setContext(context));
    }
  }

  updateContext(items) {
    store.dispatch(updateContext(items));
  }

  loadTrack(src) {
    this.audio.src = src;
  }

  get currentTime() {
    return this.audio.currentTime;
  }

  set currentTime(time) {
    return this.audio.currentTime = time;
  }

  get duration() {
    return this.audio.duration;
  }

  set blockTimeUpdate(val) {
    return this._blockTimeUpdate = val;
  }

  get currentVolume() {
    return this.audio.volume;
  }

  set currentVolume(value) {
    return this.audio.volume = value;
  }

  toggleRepeat() {
    store.dispatch(toggleReapeat());
    this._repeat = !this._repeat;
  }

  timeUpdate() {
    if (this._blockTimeUpdate) {
      return;
    }
    store.dispatch(changeCurrentTime(this.audio.currentTime));
  }

  audioOnFinish() {
    if (this._repeat) {
      this.currentTime = 0;
      this.startOver();
      return;
    }
    this.playNextTrack();
  }

  addToSavedTracks(track) {
    store.dispatch(addToFavoriteTracks(track));
  }

  removeFromSavedTracks(trackId) {
    store.dispatch(removeFromFavoriteTracks(trackId));
  }
}

const playerAPI = new PlayerAPI();
export default playerAPI;