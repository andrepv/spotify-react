import React from "react";
import { mount } from "enzyme";
import { Volume1, Volume2, VolumeX } from "react-feather";

import { ProgressBar } from "components/Player/PlayerProgressBar";
import VolumeControl from "components/Player/PlayerVolumeControl";
import RepeatButton from "components/Player/buttons/RepeatButton";
import PlayButton from "components/Player/buttons/PlayButton";
import ProgressBarSlider
from "components/Player/sliders/PlayerProgressBarSlider";
import VolumeSlider from "components/Player/sliders/PlayerVolumeSlider";
import playerAPI from "utils/playerAPI";
import { ReactComponent as PlayIcon } from "images/Player/play.svg";
import { ReactComponent as PauseIcons} from "images/Player/pause.svg";

describe("<Player />", () => {
  it("timer should display the values in the right format", () => {
    const props = {
      progressBar: {
        currentTime: 3.645988,
      },
    };
    const wrapper = mount(<ProgressBar {...props}/>);
    const timers = wrapper.find(".player__progress-time");
    expect(timers.at(0).text()).toBe("0:03");
    expect(timers.at(1).text()).toBe("0:26");
  });

  it("the progress bar should render correctly", () => {
    const props = {
      currentTime: 4.241039,
    };
    const wrapper = mount(<ProgressBarSlider {...props}/>);

    wrapper.instance().rangeWidth = 393;
    wrapper.instance().thumbWidth = 10;
    wrapper.setProps({});

    const progressBar = wrapper.find(".player__progress-bar-wrapper");
    const thumb = wrapper.find(".player__progress-thumb");

    expect(progressBar.prop("style")).toHaveProperty(
       "width", "60.55761089999999px"
    );
    expect(thumb.prop("style")).toHaveProperty(
       "left", "55.55761089999999px"
    );
  });

  it("the click on slider should update the current time of track", () => {
    const props = {
      currentTime: 0,
    };
    const event = {
      target: "",
      pageX: 739,
    };

    playerAPI.audio = {
      duration: 30.040816,
    };

    jest
    .spyOn(ProgressBarSlider.prototype, "getSliderRef")
    .mockImplementationOnce(function(ref) {
      this.slider = {
        offsetWidth: 188,
        getBoundingClientRect: function() {
          return {
            left: 510.84375,
          };
        },
      };
    });
    const wrapper = mount(<ProgressBarSlider {...props}/>);
    wrapper.instance().rangeWidth = 393;
    wrapper.instance().updateTime = jest.fn();
    wrapper.setProps({});
    wrapper.instance().sliderOnClick(event);

    expect(wrapper.instance().updateTime.mock.calls.length).toBe(1);
    expect(wrapper.instance().updateTime).toBeCalledWith(17.440203372773535);
  });

  it("the click on the volume icon should toggle tooltip", () => {
    const wrapper = mount(<VolumeControl/>);
    wrapper.find(".player__volume-control span").simulate("click");
    wrapper.find(".player__tooltip").simulate("click");

    expect(wrapper.find(".player__tooltip_active")).toHaveLength(1);
    expect(wrapper.find(VolumeSlider)).toHaveLength(1);
    expect(wrapper.state("isTooltipActive")).toBe(true);

    wrapper.find(".player__volume-control span").simulate("click");

    expect(wrapper.find(".player__tooltip_active")).toHaveLength(0);
    expect(wrapper.find(VolumeSlider)).toHaveLength(0);
    expect(wrapper.state("isTooltipActive")).toBe(false);
  });

  it("a certain icon should match to the volume value", () => {
    const wrapper = mount(<VolumeControl/>);
    expect(wrapper.find(Volume2)).toHaveLength(1);

    wrapper.setState({volume: 0.4});
    expect(wrapper.find(Volume1)).toHaveLength(1);

    wrapper.setState({volume: 0});
    expect(wrapper.find(VolumeX)).toHaveLength(1);
  });

  it("the volume slider should render correctly", () => {
    const props = {
      initialVal: 0.4083333333333333,
      onChange: jest.fn(),
    };

    jest
    .spyOn(VolumeSlider.prototype, "getThumbRef")
    .mockImplementationOnce(function(ref) {
      this.thumb = {
        offsetHeight: 10,
        style: {
          top: 0,
        },
      };
    });

    jest
    .spyOn(VolumeSlider.prototype, "getSliderWrapperRef")
    .mockImplementationOnce(function(ref) {
      this.sliderWrapper = {
        style: {
          height: 0,
        },
      };
    });

    jest
    .spyOn(VolumeSlider.prototype, "getSliderRef")
    .mockImplementationOnce(function(ref) {
      this.slider = {
        offsetHeight: 130,
      };
    });

    const wrapper = mount(<VolumeSlider {...props}/>);

    expect(props.onChange.mock.calls.length).toBe(1);
    expect(wrapper.instance().sliderWrapper.style.height).toBe("54px");
    expect(wrapper.instance().thumb.style.top).toBe("71px");
  });

  it("the click on slider should update the volume of track", () => {
    const props = {
      initialVal: 1,
      onChange: jest.fn(),
    };
    const event = {
      target: "",
      pageY: 150,
    };

    jest
    .spyOn(VolumeSlider.prototype, "getSliderRef")
    .mockImplementationOnce(function(ref) {
      this.slider = {
        offsetHeight: 188,
        getBoundingClientRect: function() {
          return {
            bottom: 203.5,
          };
        },
      };
    });
    const wrapper = mount(<VolumeSlider {...props}/>);
    wrapper.instance().rangeHeight = 120;
    wrapper.instance().updateVolume = jest.fn();
    wrapper.setProps({});
    wrapper.instance().sliderOnClick(event);

    expect(wrapper.instance().updateVolume.mock.calls.length).toBe(1);
    expect(wrapper.instance().updateVolume)
    .toBeCalledWith(0.44583333333333336);
  });

  it("repeat button should work correctly", () => {
    const props = {
      repeat: false,
      toggleRepeat: jest.fn(),
    };
    const wrapper = mount(<RepeatButton {...props}/>);
    expect(wrapper.find(".player__repeat-button_active")).toHaveLength(0);

    wrapper.find(".player__repeat-button").simulate("click");
    expect(props.toggleRepeat.mock.calls.length).toBe(1);

    wrapper.setProps({repeat: true});
    expect(wrapper.find(".player__repeat-button_active")).toHaveLength(1);
  });

  it("play button should work correctly", () => {
    const props = {
      trackPaused: false,
      trackPlaying: false,
      resumeTrack: jest.fn(),
      pauseTrack: jest.fn(),
    };
    const wrapper = mount(<PlayButton {...props}/>);
    expect(wrapper.find(PlayIcon)).toHaveLength(1);
    expect(props.resumeTrack.mock.calls.length).toBe(0);

    wrapper.setProps({
      trackPlaying: true,
      trackPaused: false,
    });
    expect(wrapper.find(PauseIcons)).toHaveLength(1);
    wrapper.find(".player__control-button span").simulate("click");
    expect(props.pauseTrack.mock.calls.length).toBe(1);

    wrapper.setProps({
      trackPaused: true,
    });
    expect(wrapper.find(PlayIcon)).toHaveLength(1);
    wrapper.find(".player__control-button span").simulate("click");
    expect(props.resumeTrack.mock.calls.length).toBe(1);
  });
});