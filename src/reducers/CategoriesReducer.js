import { CATEGORIES } from "constants/ActionConstants";

const initialCategoriesState = {
  pending: false,
  loadMorePending: false,
  items: [],
  total: 0,
  error: false,
};

export default function categories(state = initialCategoriesState, action) {
  switch ( action.type ) {
    case CATEGORIES.PENDING:
      return {
        ...state,
        pending: true,
      };
    case CATEGORIES.SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.items,
        total: action.payload.total,
      };
    case CATEGORIES.ERROR:
      return {
        ...state,
        pending: false,
        loadMorePending: false,
        error: true,
      };
    case CATEGORIES.LOAD_MORE_PENDING:
      return {
        ...state,
        loadMorePending: true,
      };
    case CATEGORIES.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMorePending: false,
        items: state.items.concat(action.payload.items),
      };
    case CATEGORIES.LOAD_MORE_ERROR:
      return {
        ...state,
        loadMorePending: false,
      };
    default:
      return state;
  }
}