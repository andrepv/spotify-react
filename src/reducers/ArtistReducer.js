import {
  FOLLOWED_ARTISTS,
  ARTIST,
  RELATED_ARTISTS,
  FOLLOW_ARTIST,
  UNFOLLOW_ARTIST,
} from "constants/ActionConstants";

const initialFollowedArtistsState = {
  pending: false,
  loadMorePending: false,
  items: [],
  loaded: false,
  total: 0,
  error: false,
};

const initialArtistState = {
  pending: false,
  followers: 0,
  isFollower: false,
  id: 0,
  image: "",
  name: "",
  error: false,
};

const initialRelatedArtistsState = {
  pending: false,
  items: [],
  artistName: "",
  error: false,
};

export function followedArtists(state = initialFollowedArtistsState, action) {
  switch (action.type) {
    case FOLLOWED_ARTISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case FOLLOWED_ARTISTS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case FOLLOWED_ARTISTS.SUCCESS:
      return {
        ...state,
        pending: false,
        total: action.payload.total,
        items: action.payload.items,
        loaded: true,
      };
    case FOLLOWED_ARTISTS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case FOLLOWED_ARTISTS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
      };
    case FOLLOWED_ARTISTS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    case UNFOLLOW_ARTIST:
    case FOLLOW_ARTIST:
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
}

export function artist(state = initialArtistState, action) {
  switch (action.type) {
    case ARTIST.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ARTIST.SUCCESS:
      return {
        ...state,
        pending: false,
        followers: action.payload.followers,
        id: action.payload.id,
        image: action.payload.images[0] ? action.payload.images[0].url : "",
        name: action.payload.name,
        isFollower: action.payload.isFollower,
      };
    case ARTIST.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case FOLLOW_ARTIST:
      return {
        ...state,
        isFollower: true,
      };
    case UNFOLLOW_ARTIST:
      return {
        ...state,
        isFollower: false,
      };
    default:
      return state;
  }
}

export function relatedArtists(state = initialRelatedArtistsState, action) {
  switch ( action.type ) {
    case RELATED_ARTISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case RELATED_ARTISTS.SUCCESS:
      return {
        ...state,
        pending: false,
        artistName: action.payload.artistName,
        items: action.payload.items,
      };
    case RELATED_ARTISTS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    default:
      return state;
  }
}