import { connect } from "react-redux";
import {
  filterByType,
  loadSearchResults,
  resetSearchResults,
  toggleSearch,
} from "actions/SearchAction";

const mapStateToProps = store => {
  return {
    searchResults: store.searchResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSearchResults: (value, options) => {
      dispatch(loadSearchResults(value, options));
    },
    filterByType: option => {
      dispatch(filterByType(option));
    },
    resetSearchResults: () => {
      dispatch(resetSearchResults());
    },
    toggleSearch: () => {
      dispatch(toggleSearch());
    },
  };
};

export const connectSearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
);