import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import BlockHeader from "components/Common/BlockHeader";
import Block from "components/Common/Block";
import SkeletonBlocks from "components/Skeleton/SkeletonBlocks";

export default class Carousel extends Component {
  carouselConfig() {
    return {
      dots: true,
      infinite: false,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      className: "carousel__wrapper",
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
          },
        },
      ],
    };
  }

  renderSlider() {
    const {items, type} = this.props;
    if (!items.length) {
      return null;
    }
    const sliderItems = items.map((item, index) => {
      return (
        <Block
          key={index}
          id={item.id}
          type={type}
          {...item}
        />
      );
    });
    return (
      <Slider {...this.carouselConfig()}>
        {sliderItems}
      </Slider>
    );
  }

  render() {
    const {pending, blockHeader} = this.props;
    if (pending) {
      return (
        <SkeletonBlocks
          className="carousel"
          itemCount={4}
          headerWithDescription={true}
        />
      );
    }
    return (
      <section>
        <BlockHeader {...blockHeader} />
        <div className="carousel">
          {this.renderSlider()}
        </div>
      </section>
    );
  }

}

Carousel.propTypes = {
  blockHeader: PropTypes.object,
  items: PropTypes.array.isRequired,
  type: PropTypes.string,
  pending: PropTypes.bool.isRequired,
};