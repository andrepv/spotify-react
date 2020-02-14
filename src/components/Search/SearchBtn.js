import React, { Component } from "react";
import PropTypes from "prop-types";
import { Search as Icon } from "react-feather";
import { connectSearchResults } from "containers/SearchResultsContainer";

export class SearchBtn extends Component {
  render() {
    const {toggleSearch, renderContent, className} = this.props;
    if (renderContent) {
      return renderContent(toggleSearch, <Icon />);
    }
    return (
      <div onClick={toggleSearch}>
        <Icon className={className} />
      </div>
    );
  }
}

SearchBtn.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  renderContent: PropTypes.func,
  className: PropTypes.string,
};

export default connectSearchResults(SearchBtn);