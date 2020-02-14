import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Columns extends Component {
  render() {
    const {amount = 1, children} = this.props;
    const columnCount = amount;
    if (columnCount === 1) {
     return children;
    }

    const itemCount = React.Children.count(children);
    const columnItems = Math.ceil(itemCount / columnCount);
    const items = React.Children.toArray(children);

    return [...Array(columnCount).keys()].map((column, index) => {
      return (
        <div className="column" key={index}>
          {items.slice(column * columnItems, columnItems * (column + 1))}
        </div>
      );
    });
  }
}

Columns.propTypes = {
  amount: PropTypes.number.isRequired,
};