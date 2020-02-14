import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "react-feather";

import { ReactComponent as Loader } from "images/loader.svg";
import BlockHeader from "components/Common/BlockHeader";
import OpenContextMenuButton from "components/Common/OpenContextMenuButton";
import ContextMenuItems from "components/Common/ContextMenuItems";
import InfiniteScroll from "components/Common/InfiniteScroll";
import ChartTracks from "./ChartTracks";
import { connectCharts } from "containers/ChartsContainer";
import "styles/Select.scss";

export class Charts extends Component {
  componentDidMount() {
    const {tracks, filterByCountry} = this.props;
    window.scrollTo(0, 0);
    if (!tracks.items.length) {
      filterByCountry();
    }
  }

  renderContextMenu = closeMenu => {
    const {filterByCountry, countries} = this.props;
    const handler = country => {
      filterByCountry(country.name);
      closeMenu();
    };
    return (
      <div className="context-menu select__country">
        <div className="select__title select__title_not-active">
          Select Country
        </div>
        <ContextMenuItems
          items={countries}
          handler={handler}
        />
      </div>
    );
  }

  renderContextMenuButton() {
    const {country, pending} = this.props.charts;
    return (
      <OpenContextMenuButton
        className="select"
        renderContextMenu={this.renderContextMenu}
        renderContent={toggleContextMenu => {
          return (
            <div
              className="select__label"
              onClick={toggleContextMenu}
            >
              <span>{country}</span>
              {pending
                ? <Loader/>
                : <ChevronDown className="chevron-up"/>
              }
            </div>
          );
        }}
      />
    );
  }

  render() {
    const {loadMore} = this.props;
    const {playlistId} = this.props.charts;
    const {items, loadMorePending, total} = this.props.tracks;
    const contextMenuButton = this.renderContextMenuButton();
    const loadData = () => loadMore(playlistId, items.length);
    return (
      <section>
        <BlockHeader
          title="Charts"
          button={contextMenuButton}
        />
        <InfiniteScroll
          total={total}
          dataLength={items.length}
          loadData={loadData}
          pending={loadMorePending}
        >
          <ChartTracks
            playlistId={playlistId}
            tracks={items}
          />
        </InfiniteScroll>
      </section>
    );
  }
}

Charts.propTypes = {
  charts: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  filterByCountry: PropTypes.func.isRequired,
};

export default connectCharts(Charts);