import React from "react";
import { shallow } from "enzyme";
import InfiniteScroll from "components/Common/InfiniteScroll";

describe("<InfiniteScroll />", () => {
  it("should load new data", () => {
    const props = {
      dataLength: 2,
      total: 6,
      loadData: jest.fn(),
      pending: false,
      containerSelector: "body > div",
    };
    const fakeContainer = {
      scrollTop: 40,
      clientHeight: 20,
      scrollHeight: 60,
    };
    const wrapper = shallow(<InfiniteScroll {...props}/>);
    wrapper.instance().container = fakeContainer;
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(1);

    wrapper.setProps({dataLength: 4});
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(2);

    wrapper.setProps({dataLength: 6});
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(2);
  });

  it("shouldn't load the data, until a user scroll to the bottom", () => {
    const props = {
      dataLength: 2,
      total: 6,
      loadData: jest.fn(),
      pending: false,
      containerSelector: "body > div",
    };
    const fakeContainer = {
      scrollTop: 20,
      clientHeight: 20,
      scrollHeight: 60,
    };
    const wrapper = shallow(<InfiniteScroll {...props}/>);
    wrapper.instance().container = fakeContainer;
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(0);
  });

  it("shouldn't load the data, when the prop 'disable' is true", () => {
    const props = {
      dataLength: 2,
      total: 4,
      loadData: jest.fn(),
      pending: false,
      disable: true,
      containerSelector: "body > div",
    };
    const fakeContainer = {
      scrollTop: 40,
      clientHeight: 20,
      scrollHeight: 60,
   };
    const wrapper = shallow(<InfiniteScroll {...props}/>);
    wrapper.instance().container = fakeContainer;
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(0);
  });

  it("should display the loader, when the prop 'pending' is true", () => {
    const props = {
      dataLength: 2,
      total: 4,
      loadData: jest.fn(),
      pending: true,
      containerSelector: "body > div",
    };
    const fakeContainer = {
      scrollTop: 40,
      clientHeight: 20,
      scrollHeight: 60,
   };
    const wrapper = shallow(<InfiniteScroll {...props}/>);
    wrapper.instance().container = fakeContainer;
    wrapper.instance().handleOnScroll();
    expect(props.loadData.mock.calls.length).toBe(0);
    expect(wrapper.find(".loader")).toHaveLength(1);
  });
});