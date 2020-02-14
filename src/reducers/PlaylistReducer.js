import {
  CATEGORY_PLAYLISTS,
  FEATURED_PLAYLISTS,
  USER_PLAYLISTS,
  ADD_TRACK_TO_PLAYLIST,
  REMOVE_TRACK_FROM_PLAYLIST,
  PLAYLIST,
  FOLLOW_PLAYLIST,
  UNFOLLOW_PLAYLIST,
  UPLOAD_PLAYLIST_COVER,
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
  PLAYLIST_TRACKS,
  CREATE_PLAYLIST,
  LIST_USER_PLAYLISTS,
  CHANGE_PLAYLIST_DETAILS,
} from "constants/ActionConstants";
import toggleLike from "utils/toggleLike";

const initialCategoryPlaylistsState = {
  pending: false,
  loadMorePending: false,
  items: [],
  categoryName: "",
  categoryId: "",
  total: 0,
  error: false,
};

const initialFeaturedPlaylistsState = {
  pending: false,
  items: [],
  message: "",
  error: false,
};

const initialUserPlaylistsState = {
  pending: false,
  loadMorePending: false,
  total: 0,
  items: [],
  loaded: false,
  error: false,
};

export const initialListUserPlaylistsState = {
  pending: false,
  loadMorePending: false,
  total: 0,
  loaded: false,
  items: [],
  error: false,
};

const initialPlaylistState = {
  pending: false,
  loadMorePending: false,
  authors: {
    name: "",
    id: "",
  },
  id: "",
  image: "",
  name: "",
  public: false,
  collaborative: false,
  followers: "",
  snapshotId: "",
  isAvailableForPreview: false,
  items: [],
  removeFromPlaylistSuccess: false,
  removeFromPlaylistError: false,
  playlistOwnerId: null,
  totalTracks: 0,
  isSaved: false,
  error: false,
};

export function categoryPlaylists(
  state = initialCategoryPlaylistsState, action
) {
  switch ( action.type ) {
    case CATEGORY_PLAYLISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case CATEGORY_PLAYLISTS.SUCCESS:
      return {
        ...state,
        pending: !action.payload.items.length,
        categoryName: action.payload.categoryName,
        items: action.payload.items,
        total: action.payload.total,
        categoryId: action.payload.categoryId,
        error: false,
      };
    case CATEGORY_PLAYLISTS.ERROR:
      return {
        ...state,
        pending: true,
        loadMorePending: false,
        error: true,
      };
    case CATEGORY_PLAYLISTS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case CATEGORY_PLAYLISTS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
      };
    case CATEGORY_PLAYLISTS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    default:
      return state;
  }
}

export function featuredPlaylists(
  state = initialFeaturedPlaylistsState, action
) {
  switch (action.type) {
    case FEATURED_PLAYLISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case FEATURED_PLAYLISTS.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.items,
        message: action.payload.message,
        error: false,
      };
    case FEATURED_PLAYLISTS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    default:
      return state;
  }
}

export function userPlaylists(state = initialUserPlaylistsState, action) {
  switch (action.type) {
    case USER_PLAYLISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case USER_PLAYLISTS.SUCCESS:
      return {
        ...state,
        pending: false,
        total: action.payload.total,
        items: action.payload.items,
        loaded: true,
        error: false,
      };
    case USER_PLAYLISTS.ERROR:
      return {
        ...state,
        pending: false,
        loadMorePending: false,
        error: true,
      };
    case USER_PLAYLISTS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case USER_PLAYLISTS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
      };
    case USER_PLAYLISTS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    case FOLLOW_PLAYLIST:
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        total: state.total + 1,
      };
    case UNFOLLOW_PLAYLIST:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.id !== action.payload;
        }),
        total: state.total - 1,
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        total: state.total + 1,
      };
    case ADD_TRACK_TO_PLAYLIST:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id === action.payload) {
            let itemCount = Number(state.items[index].meta.split(" ")[0]) + 1;
            return {
              ...state.items[index],
              meta: itemCount === 1
                ? `${itemCount} track`
                : `${itemCount} tracks`,
            };
          }
          return item;
        }),
      };
    case REMOVE_TRACK_FROM_PLAYLIST:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id === action.payload.playlistId) {
            let itemCount = Number(state.items[index].meta.split(" ")[0]) - 1;
            return {
              ...state.items[index],
              meta: itemCount === 1
                ? `${itemCount} track`
                : `${itemCount} tracks`,
            };
          }
          return item;
        }),
      };
    case CHANGE_PLAYLIST_DETAILS:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id === action.payload.playlistId) {
            return {
              ...state.items[index],
              [action.payload.key]: action.payload.value,
            };
          }
          return item;
        }),
      };
    case UPLOAD_PLAYLIST_COVER:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id === action.payload.playlistId) {
            return {
              ...state.items[index],
              image: action.payload.image,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export function listUserPlaylists(
  state = initialListUserPlaylistsState, action
) {
  switch (action.type) {
    case LIST_USER_PLAYLISTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case LIST_USER_PLAYLISTS.SUCCESS:
      return {
        ...state,
        pending: false,
        loaded: true,
        total: action.payload.total,
        items: action.payload.items,
        error: false,
      };
    case LIST_USER_PLAYLISTS.ERROR:
      return {
        ...state,
        pending: false,
        loadMorePending: false,
        error: true,
      };
    case LIST_USER_PLAYLISTS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case LIST_USER_PLAYLISTS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
      };
    case LIST_USER_PLAYLISTS.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    case UNFOLLOW_PLAYLIST:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.id !== action.payload;
        }),
        total: state.total - 1,
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        total: state.total + 1,
      };
    case CHANGE_PLAYLIST_DETAILS:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id === action.payload.playlistId) {
            return {
              ...state.items[index],
              [action.payload.key]: action.payload.value,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export function playlist(state = initialPlaylistState, action) {
  switch (action.type) {
    case PLAYLIST.PENDING:
      return {
        ...state,
        pending: true,
      };
    case PLAYLIST.SUCCESS:
      const {payload} = action;
      return {
        ...state,
        pending: false,
        authors: {
          name: payload.owner.display_name,
          id: payload.owner.id,
        },
        id: payload.id,
        image: payload.images[0] && payload.images[0].url,
        name: payload.name,
        followers: payload.followers,
        snapshotId: payload.snapshot_id,
        public: payload.public,
        collaborative: payload.collaborative,
        items: payload.items,
        playlistOwnerId: payload.owner.id,
        totalTracks: payload.tracks.total,
        isAvailableForPreview: payload.isAvailableForPreview,
        isSaved: payload.saved,
        error: false,
      };
    case PLAYLIST.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case FOLLOW_PLAYLIST:
      return {
        ...state,
        isSaved: true,
      };
    case UNFOLLOW_PLAYLIST:
      return {
        ...state,
        isSaved: false,
      };
    case UPLOAD_PLAYLIST_COVER:
      return {
        ...state,
        image: action.payload.image,
      };
    case CHANGE_PLAYLIST_DETAILS:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case PLAYLIST_TRACKS.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case PLAYLIST_TRACKS.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
        isAvailableForPreview: (
          state.isAvailableForPreview ||
          action.payload.isAvailableForPreview
        ),
      };
    case PLAYLIST_TRACKS.LOAD_MORE_ERROR:
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
    case REMOVE_TRACK_FROM_PLAYLIST:
      const updatedItems = state.items.filter((track, index) => {
        return index !== action.payload.position;
      });
      const isAvailableForPreview = updatedItems.filter(item => {
        return Boolean(item.preview_url);
      });
      return {
        ...state,
        removeFromPlaylistSuccess: true,
        snapshotId: action.payload.snapshot_id,
        totalTracks: state.totalTracks - 1,
        items: updatedItems,
        isAvailableForPreview: Boolean(isAvailableForPreview.length),
      };
    default:
      return state;
  }
}