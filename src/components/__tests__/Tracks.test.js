import React from "react";
import { shallow } from "enzyme";

import { Tracks } from "components/Common/Tracks";
import playerAPI from "utils/playerAPI";
import Track from "components/Common/Track/Track";
import { initialPlayerState } from "reducers/PlayerReducer";

describe("<Tracks />", () => {
  it("count of tracks and trackList elements should be equal", () => {
    const props = {
      trackList: [{}, {}, {}],
      source: {name: "test"},
      player: initialPlayerState,
    };
    const wrapper = shallow(<Tracks {...props}/>);
    expect(wrapper.find(Track)).toHaveLength(3);
  });

  it("when to call the updateContext method", () => {
    const props = {
      trackList: [{}, {}, {}],
      source: {name: "test"},
      player: {
        ...initialPlayerState,
        context: {
          name: "test",
          tracks: [{}, {}, {}],
        },
      },
    };
    playerAPI.updateContext = jest.fn();
    const wrapper = shallow(<Tracks {...props}/>);
    wrapper.setProps({trackList: [{}, {}, {}, {}]});
    expect(playerAPI.updateContext.mock.calls.length).toBe(1);

    wrapper.setProps({
      player: {
        ...initialPlayerState,
        playingTrackId: "2",
      },
    });
    expect(playerAPI.updateContext.mock.calls.length).toBe(1);
  });

  it("when not to call the updateContext method", () => {
    const props = {
      trackList: [{}, {}, {}],
      source: {name: "test"},
      player: {
        ...initialPlayerState,
        context: {
          name: "test2",
          tracks: [{}, {}, {}],
        },
      },
    };
    playerAPI.updateContext = jest.fn();
    const wrapper = shallow(<Tracks {...props}/>);
    wrapper.setProps({trackList: [{}, {}, {}, {}]});
    expect(playerAPI.updateContext.mock.calls.length).toBe(0);
  });
});