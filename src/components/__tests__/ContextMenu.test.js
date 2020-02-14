import React from "react";
import { mount } from "enzyme";
import ContextMenu from "components/Common/ContextMenu";

describe("<ContextMenu />", () => {
  let props;
  beforeEach(() => {
    props = {
      currentPageNum: 1,
      totalPages: 2,
      renderContent: jest.fn(),
      defaultTop: 17,
      getOffsetTop: menuHeight => menuHeight < 150 ? -100 : -260,
      containerRef: {
        getBoundingClientRect: () => {
          return {
            bottom: 700,
          };
        },
      },
    };
  });

  it("the renderContent should accept the two args", () => {
    const wrapper = mount(<ContextMenu {...props} />);
    expect(wrapper.state("totalPages")).toEqual(2);
    expect(wrapper.state("currentPageNum")).toEqual(1);

    expect(props.renderContent.mock.calls.length).toBe(2);
    expect(props.renderContent).lastCalledWith(1, expect.any(Function));
  });

  it("the menuHeight should be equal to the offsetHeight property", () => {
    jest
    .spyOn(ContextMenu.prototype, "getRef")
    .mockImplementationOnce(function(ref) {
      this.menu = {offsetHeight: 200};
    });

    const wrapper = mount(<ContextMenu {...props} />);
    expect(wrapper.state("menuHeight")).toEqual(200);

    wrapper.instance().menu = {offsetHeight: 100};
    wrapper.setProps({});
    expect(wrapper.state("menuHeight")).toEqual(100);
  });

  it("menu position should be relative to the window", () => {
    jest
    .spyOn(ContextMenu.prototype, "getRef")
    .mockImplementationOnce(function(ref) {
      this.menu = {offsetHeight: 100};
    });

    const wrapper = mount(<ContextMenu {...props} />);
    expect(wrapper.instance().getOffsetTop()).toEqual("-100px");

    wrapper.instance().menu = {offsetHeight: 30};
    wrapper.setProps({});
    expect(wrapper.instance().getOffsetTop()).toEqual("17px");
    wrapper.instance().menu = {offsetHeight: 200};
    wrapper.setProps({});
    expect(wrapper.instance().getOffsetTop()).toEqual("-260px");
  });

  it("the navigateToPage should change a value of state", () => {
    const wrapper = mount(<ContextMenu {...props} />);
    const navigateToPage2 = () => wrapper.instance().navigateToPage(2);
    const button = mount(
      <button onClick={navigateToPage2}>
        Page 2
      </button>
    );
    button.find("button").simulate("click");
    setTimeout(() => {
      expect(wrapper.state("currentPageNum")).toEqual(2);
    }, 300);
  });
});