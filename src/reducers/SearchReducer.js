import {
  FILTER_BY_TYPE,
  SEARCH_RESULTS,
  RESET_SEARCH_RESULTS,
  TOGGLE_SEARCH,
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
} from "constants/ActionConstants";
import toggleLike from "utils/toggleLike";

export const initialSearchResultsState = {
  pending: false,
  items: [],
  type: "track",
  isOpen: false,
  error: false,
};

export default function searchResults(
  state = initialSearchResultsState, action
) {
  switch ( action.type ) {
    case FILTER_BY_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case SEARCH_RESULTS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case SEARCH_RESULTS.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload,
      };
    case SEARCH_RESULTS.ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case RESET_SEARCH_RESULTS:
      return {
        pending: false,
        items: [],
        type: "track",
        isOpen: state.isOpen,
        error: false,
      };
    case TOGGLE_SEARCH:
      return {
        ...state,
        isOpen: !state.isOpen,
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