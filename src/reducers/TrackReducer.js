import {
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
  ARTIST_TOP_TRACKS,
  TOP_TRACKS,
  SAVED_TRACKS,
} from "constants/ActionConstants";
import toggleLike from "utils/toggleLike";

const initialArtistTopTracksState = {
  pending: false,
  items: [],
  error: false,
};

const initialTopTracksState = {
  pending: false,
  loadMorePending: false,
  items: [],
  total: 0,
  error: false,
};

const initialSavedTracksState = {
  pending: false,
  loadMorePending: false,
  items: [],
  total: 0,
  loaded: false,
  error: false,
};

export function artistTopTracks(state = initialArtistTopTracksState, action) {
  switch (action.type) {
    case ARTIST_TOP_TRACKS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ARTIST_TOP_TRACKS.SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        items: action.payload.items,
      };
    case ARTIST_TOP_TRACKS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case ADD_TO_FAVORITE_TRACKS:
      return {
        ...state,
        items: toggleLike(state.items, action.payload.id),
      };
    case REMOVE_FROM_FAVORITE_TRACKS:
      return {
        ...state,
        items: toggleLike(state.items, action.payload.id),
      };
    default:
      return state;
  }
}

export function topTracks(state = initialTopTracksState, action) {
  switch (action.type) {
    case TOP_TRACKS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case TOP_TRACKS.SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        items: action.payload.items,
        total: action.payload.total,
      };
    case TOP_TRACKS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case TOP_TRACKS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case TOP_TRACKS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        pending: false,
        items: state.items.concat(action.payload.items),
      };
    case TOP_TRACKS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    case ADD_TO_FAVORITE_TRACKS:
      return {
        ...state,
        items: toggleLike(state.items, action.payload.id),
      };
    case REMOVE_FROM_FAVORITE_TRACKS:
      return {
        ...state,
        items: toggleLike(state.items, action.payload.id),
      };
    default:
      return state;
  }
}

export function savedTracks(state = initialSavedTracksState, action) {
  switch ( action.type ) {
    case SAVED_TRACKS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case SAVED_TRACKS.SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        total: action.payload.total,
        items: action.payload.items,
        loaded: true,
      };
    case SAVED_TRACKS.ERROR:
      return {
        ...state,
        pending: false,
        loaded: action.payload ? true : state.loaded,
        error: true,
      };
    case SAVED_TRACKS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case SAVED_TRACKS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        pending: false,
        items: state.items.concat(action.payload.items),
      };
    case SAVED_TRACKS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    case ADD_TO_FAVORITE_TRACKS:
      let track = {
        ...action.payload,
        saved: true,
      };
      return {
        ...state,
        items: [track, ...state.items],
        total: state.total + 1,
      };
    case REMOVE_FROM_FAVORITE_TRACKS:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.id !== action.payload.id;
        }),
        total: state.total - 1,
      };
    default:
      return state;
  }
}