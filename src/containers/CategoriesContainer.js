import { connect } from "react-redux";
import {
  loadCategories,
  loadMoreCategories,
} from "actions/CategoryActions";

const mapStateToProps = store => {
  return {
    categories: store.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: limit => {
      dispatch(loadCategories(limit));
    },
    loadMore: offset => {
      dispatch(loadMoreCategories(offset));
    },
  };
};

export const connectCategories = connect(
  mapStateToProps,
  mapDispatchToProps
);