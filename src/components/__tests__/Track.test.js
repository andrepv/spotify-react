import React from "react";
import { shallow } from "enzyme";
import { ChevronLeft } from "react-feather";

import Track from "components/Common/Track/Track";
import { CoverImage } from "components/Common/Track/TrackCoverImage";
import TrackInfo from "components/Common/Track/TrackInfo";
import playerAPI from "utils/playerAPI";
import PlayButton from "components/Common/Track/buttons/PlayButton";
import PauseButton from "components/Common/Track/buttons/PauseButton";
import { ContextMenuPlaylists }
from "components/Common/Track/contextMenu/ContextMenuPlaylists";
import { initialPlayerState } from "reducers/PlayerReducer";
import { initialListUserPlaylistsState }
from "reducers/PlaylistReducer";

describe("<Track />", () => {
  it("track should have the 'track_active' class", () => {
    const props = {
      trackList: [{}, {}, {}],
      source: {name: "test"},
      track: {isActive: true},
    };
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find(".track_active")).toHaveLength(1);
  });

  it("play and pause buttons should toggle correctly", () => {
    const props = {
      track: {isActive: true},
      trackContext: {name: "album", tracks: [{}, {}, {}]},
      player: {
        ...initialPlayerState,
        trackPaused: true,
      },
    };
    const wrapper = shallow(<CoverImage {...props} />);
    expect(wrapper.find(".track__cover-art_has-image")).toHaveLength(0);
    expect(wrapper.find("img")).toHaveLength(0);
    expect(wrapper.find(PlayButton)).toHaveLength(1);
    wrapper.setProps({
      player: {
        ...initialPlayerState,
        trackPaused: false,
      },
    });
    expect(wrapper.find(PlayButton)).toHaveLength(0);
    expect(wrapper.find(PauseButton)).toHaveLength(1);

    wrapper.setProps({track: {isActive: false}});
    expect(wrapper.find(PlayButton)).toHaveLength(1);
    expect(wrapper.find(PauseButton)).toHaveLength(0);
  });

  it("should render the count of tracks correctly", () => {
    const props = {
      charts: true,
      track: {key: 5, authors: []},
    };
    const wrapper = shallow(<TrackInfo {...props} />);
    expect(wrapper.find(".track__chart-number")).toHaveLength(1);
    expect(wrapper.find(".track__chart-number").at(0).text()).toEqual("05");
    wrapper.setProps({track: {key: 15, authors: []}});
    expect(wrapper.find(".track__chart-number").at(0).text()).toEqual("15");
  });

  it("context menu should work correctly", () => {
    const props = {
      playlists: initialListUserPlaylistsState,
      addTrackToPlaylist: jest.fn(),
      totalPages: 2,
      navigateToPage: jest.fn(),
      trackUri: "",
      closeContextMenu: jest.fn(),
      loadUserPlaylists: jest.fn(),
    };
    const wrapper = shallow(<ContextMenuPlaylists {...props} />);
    expect(props.loadUserPlaylists.mock.calls.length).toBe(1);
    expect(wrapper.find(".select__title_not-active")).toHaveLength(0);
    expect(wrapper.find(ChevronLeft)).toHaveLength(1);

    wrapper.find(".select__title").simulate("click");
    expect(props.navigateToPage.mock.calls.length).toBe(1);

    wrapper.setProps({totalPages: 1});
    wrapper.find(".select__title").simulate("click");
    expect(props.navigateToPage.mock.calls.length).toBe(1);
  });

  it("play button should work correctly", () => {
    const props = {
      context: {},
      track: {preview_url: null},
    };

    const wrapper = shallow(<PlayButton {...props}/>);
    wrapper.instance().play = jest.fn();

    expect(wrapper.find(".track__icon.disabled")).toHaveLength(1);
    wrapper.find(".track__icon.disabled").simulate("click");
    expect(wrapper.instance().play.mock.calls.length).toBe(0);

    wrapper.setProps({track: {preview_url: "test"}});
    expect(wrapper.find(".track__icon.disabled")).toHaveLength(0);
    wrapper.find(".track__icon").simulate("click");
    expect(wrapper.instance().play.mock.calls.length).toBe(1);
  });

  it("play method should work correctly", () => {
    const props = {
      context: {},
      track: {preview_url: "test", isActive: true},
    };
    playerAPI.resumeTrack = jest.fn();
    playerAPI.playTrack = jest.fn();
    const wrapper = shallow(<PlayButton {...props}/>);

    wrapper.find(".track__icon").simulate("click");
    expect(playerAPI.resumeTrack.mock.calls.length).toBe(1);
    expect(playerAPI.playTrack.mock.calls.length).toBe(0);

    wrapper.setProps({track: {preview_url: "test", isActive: false}});

    wrapper.find(".track__icon").simulate("click");
    expect(playerAPI.playTrack.mock.calls.length).toBe(1);
  });
});