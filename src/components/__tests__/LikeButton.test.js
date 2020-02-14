import React from "react";
import { mount } from "enzyme";
import LikeButton from "components/Common/LikeButton";

describe("<LikeButton />", () => {
  it("should work right", () => {
    const props = {
      unlike: jest.fn(),
      like: jest.fn(),
      isActive: true,
    };
    const wrapper = mount(<LikeButton {...props}/>);
    expect(wrapper.find("svg.like-btn_active")).toHaveLength(1);

    wrapper.find("svg").simulate("click");
    expect(props.unlike.mock.calls.length).toBe(1);

    wrapper.setProps({isActive: false});
    expect(wrapper.find("svg.like-btn_active")).toHaveLength(0);

    wrapper.find("svg").simulate("click");
    expect(props.like.mock.calls.length).toBe(1);
  });
});