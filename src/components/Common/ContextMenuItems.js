import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Loader } from "images/loader.svg";

export default class ContextMenuItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      menuItems: props.items,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {items, disableInfiniteScroll} = this.props;
    const {searchInputValue} = this.state;
    if (prevProps.items.length < items.length) {
      this.setState({
        menuItems: items,
      });
    }
    if (searchInputValue !== prevState.searchInputValue) {
      disableInfiniteScroll &&
      disableInfiniteScroll(Boolean(searchInputValue.length));
    }
  }

  resetState = () => {
    this.setState({
      searchInputValue: "",
      menuItems: this.props.items,
    });
  }

  selectItem = item => {
    if (item.name === "no results") {
     return;
    }
    this.props.handler({
      ...item,
      name: Array.isArray(item.name) ? item.name.join("") : item.name,
    });
    this.resetState();
  }

  handleInputChange = event => {
    const inputValue = event.target.value.toLowerCase().trim();
    let searchMatches = this.props.items;

    if (inputValue.length) {
      searchMatches = this.props.items.filter(item => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(inputValue);
      }).map(item => {
        const reg = new RegExp(`(${inputValue})`, "i");
        return {
          ...item,
          name: item.name.split(reg),
        };
      });
    }

    this.setState({
      searchInputValue: event.target.value,
      menuItems: searchMatches.length ? searchMatches : [{name: "no results"}],
    });
  }

  renderItem(itemName) {
    if (Array.isArray(itemName)) {
      return itemName.map((part, index) => {
        const inputValue = this.state.searchInputValue.toLowerCase();
        const itemPart = part.toLowerCase();
        return (
          <span
            key={index}
            className={`${itemPart === inputValue ? "marked" : ""}`}
          >
            {part}
          </span>
        );
      });
    }
    return itemName;
  }

  renderMenuItems() {
    return this.state.menuItems.map((item, index) => {
      return (
        <li
          key={index}
          className="select__option overflow-ellipsis"
          onClick={() => this.selectItem(item)}
        >
          {this.renderItem(item.name)}
        </li>
      );
    });
  }

  render() {
    const {loadMorePending, items, emptyMsg} = this.props;
    if (!items.length) {
      return (
        <p className="select__empty">
          {emptyMsg}
        </p>
      );
    }
    return (
      <div className="select__dropdown">
        <div className="select__inner custom-scrollbar">
          <ul>
            {this.renderMenuItems()}
          </ul>
          {loadMorePending && <div className="loader"><Loader/></div>}
        </div>
        <div className="select__search">
          <input
            type="text"
            className="select__search-input"
            placeholder="Search..."
            onChange={this.handleInputChange}
            value={this.state.searchInputValue}
          />
        </div>
      </div>
    );
  }
}

ContextMenuItems.propTypes = {
  items: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  disableInfiniteScroll: PropTypes.func,
  emptyMsg: PropTypes.string,
  loadMorePending: PropTypes.bool,
};