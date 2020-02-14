import {
  ALBUM,
  NEW_RELEASES,
  ARTIST_ALBUMS,
  ARTIST_SINGLES,
  ADD_TO_MY_SAVED_ALBUMS,
  REMOVE_FROM_MY_SAVED_ALBUMS,
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
} from "constants/ActionConstants";
import toggleLike from "utils/toggleLike";

const initialNewReleasesState = {
  pending: false,
  loadMorePending: false,
  items: [],
  total: 0,
  error: false,
};

const initialAlbumState = {
  pending: false,
  authors: [],
  id: "",
  image: "",
  name: "",
  date: "",
  totalTracks: 0,
  isSaved: false,
  items: [],
  isAvailableForPreview: false,
  error: false,
};

const initialArtistAlbumsState = {
  pending: false,
  loadMorePending: false,
  total: 0,
  items: [],
  error: false,
};

const initialArtistSinglesState = {
  pending: false,
  loadMorePending: false,
  items: [],
  total: 0,
  error: false,
};

export function newReleases(state = initialNewReleasesState, action) {
  switch (action.type) {
    case NEW_RELEASES.PENDING:
      return {
        ...state,
        pending: true,
      };
    case NEW_RELEASES.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.albums,
        total: action.payload.total,
      };
    case NEW_RELEASES.ERROR:
      return {
        ...state,
        pending: false,
        loadMorePending: false,
        error: true,
      };
    case NEW_RELEASES.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case NEW_RELEASES.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload),
      };
    case NEW_RELEASES.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    default:
      return state;
  }
}

export function album(state = initialAlbumState, action) {
  switch (action.type) {
    case ALBUM.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ALBUM.SUCCESS:
      return {
        ...state,
        pending: false,
        authors: action.payload.artists,
        id: action.payload.id,
        image: action.payload.images[0].url,
        name: action.payload.name,
        date: action.payload.release_date.split("-")[0],
        totalTracks: action.payload.totalTracks,
        items: action.payload.tracks,
        isAvailableForPreview: action.payload.isAvailableForPreview,
        isSaved: action.payload.isSaved,
      };
    case ADD_TO_MY_SAVED_ALBUMS:
      return {
        ...state,
        isSaved: true,
      };
    case REMOVE_FROM_MY_SAVED_ALBUMS:
      return {
        ...state,
        isSaved: false,
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
    case ALBUM.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    default:
      return state;
  }
}

export function artistAlbums(state = initialArtistAlbumsState, action) {
  switch (action.type) {
    case ARTIST_ALBUMS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ARTIST_ALBUMS.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.items,
        total: action.payload.total,
      };
    case ARTIST_ALBUMS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case ARTIST_ALBUMS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case ARTIST_ALBUMS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload),
      };
    case ARTIST_ALBUMS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    default:
      return state;
  }
}

export function artistSingles(state = initialArtistSinglesState, action) {
  switch (action.type) {
    case ARTIST_SINGLES.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ARTIST_SINGLES.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.items,
        total: action.payload.total,
      };
    case ARTIST_SINGLES.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case ARTIST_SINGLES.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case ARTIST_SINGLES.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload),
      };
    case ARTIST_SINGLES.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    default:
      return state;
  }
}