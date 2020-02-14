import { CATEGORIES } from "constants/ActionConstants";
import { CATEGORIES_LIMIT, MESSAGES } from "constants/AppConstants";
import spotifyQuery from "utils/spotifyApi";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";
import alert from "components/Common/Alert/Alert";

export function loadCategories() {
  return async dispatch => {
    const pending = makeActionCreator(CATEGORIES.PENDING);
    const success = makeActionCreator(CATEGORIES.SUCCESS, "payload");
    const error = makeActionCreator(CATEGORIES.ERROR);
    try {
      dispatch(pending());
      const categories = await spotifyQuery(
        "getCategories",
        [{limit: CATEGORIES_LIMIT}]
      );
      dispatch(
        success(transformResponse.categories(categories))
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
       return;
      }
      dispatch(error());
    }
  };
}

export function loadMoreCategories(offset) {
  return async dispatch => {
    const pending = makeActionCreator(CATEGORIES.LOAD_MORE_PENDING);
    const success = makeActionCreator(CATEGORIES.LOAD_MORE_SUCCESS, "payload");
    const error = makeActionCreator(CATEGORIES.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const categories = await spotifyQuery(
        "getCategories",
        [{limit: CATEGORIES_LIMIT, offset}]
      );
      dispatch(
        success(transformResponse.categories(categories))
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}