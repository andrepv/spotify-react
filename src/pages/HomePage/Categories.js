import React, { Component } from "react";
import PropTypes from "prop-types";

import BlockHeader from "components/Common/BlockHeader";
import Category from "components/Common/Category";
import SkeletonCategories from "components/Skeleton/SkeletonCategories";
import { GENRES } from "constants/RouteConstants";
import { connectCategories } from "containers/CategoriesContainer";

export class Categories extends Component {
  componentDidMount() {
    const {categories, loadCategories} = this.props;
    if (!categories.items.length) {
      loadCategories();
    }
  }

  render() {
    const {pending, items} = this.props.categories;
    const categories = items.slice(0, 8);
    if (pending) {
      return <SkeletonCategories preview={true} />;
    }
    return (
      <section className="categories_preview">
        <BlockHeader
          title="Genres & Moods"
          description="Discover"
          link={GENRES}
        />
       <div className="categories__container">
          {categories.map((category, index) => {
            return (
              <Category
                key={index}
                id={category.id}
                image={category.image}
                name={category.name}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  loadCategories: PropTypes.func.isRequired,
};

export default connectCategories(Categories);