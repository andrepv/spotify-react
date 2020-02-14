import {
  PLAYER,
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
} from "constants/ActionConstants";

export const initialPlayerState = {
  trackPlaying: false,
  trackPaused: false,
  playingTrackId: "",
  repeat: false,
  trackInfo: {},
  context: {
    name: "",
    tracks: [],
  },
};

const initialProgressBarState = {
  currentTime: 0,
};

export function player(state = initialPlayerState, action) {
  switch ( action.type ) {
    case PLAYER.PLAY:
      return {
        ...state,
        trackPlaying: true,
        trackPaused: false,
        playingTrackId: action.payload.id,
        trackInfo: {...action.payload},
      };
    case PLAYER.SET_CONTEXT:
      return {
        ...state,
        context: action.payload,
      };
    case PLAYER.PAUSE:
      return {
        ...state,
        trackPaused: true,
      };
    case PLAYER.RESUME:
      return {
        ...state,
        trackPaused: false,
      };
    case PLAYER.UPDATE_CONTEXT:
      return {
        ...state,
        context: {
          name: state.context.name,
          tracks: action.payload,
        },
      };
    case PLAYER.TOGGLE_REPEAT:
      return {
        ...state,
        repeat: !state.repeat,
      };
    case ADD_TO_FAVORITE_TRACKS:
    case REMOVE_FROM_FAVORITE_TRACKS:
      if (action.payload.id === state.playingTrackId) {
        return {
          ...state,
          trackInfo: {
            ...state.trackInfo,
            saved: !state.trackInfo.saved,
          },
        };
      }
    default:
      return state;
  }
}

export function progressBar(state = initialProgressBarState, action) {
  switch ( action.type ) {
    case PLAYER.CHANGE_CURRENT_TIME:
      return {
        currentTime: action.payload,
      };
    default:
      return state;
  }
}