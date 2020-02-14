import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import ContextMenuItems from "components/Common/ContextMenuItems";

describe("<ContextMenuItems />", () => {
  it("renders correctly", () => {
    const props = {
      items: [{name: "item1"}, {name: "item2"}],
      handler: jest.fn(),
    };
    const component = renderer.create(
      <ContextMenuItems {...props} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should render items correctly", () => {
    const props = {
      items: [{name: "item1"}, {name: "item2"}],
      handler: jest.fn(),
    };
    const wrapper = shallow(<ContextMenuItems {...props} />);
    const target = wrapper.find(".select__option");

    expect(wrapper.state("menuItems")).toEqual(props.items);
    expect(target).toHaveLength(props.items.length);
    expect(target.at(0).text()).toEqual(props.items[0].name);
  });

  it("should render the right search results", () => {
    const props = {
      items: [{name: "item1"}, {name: "item2"}],
      handler: jest.fn(),
      disableInfiniteScroll: jest.fn(),
    };
    const wrapper = shallow(<ContextMenuItems {...props} />);
    wrapper.find(".select__search-input").simulate(
      "change",
      {target: {value: "i"}}
    );

    const items = wrapper.find(".select__option");
    const searchInput = wrapper.find(".select__search-input");
    expect(items).toHaveLength(props.items.length);
    expect(items.everyWhere(n => {
      return (
        n.children().length === 3 &&
        n.find("span.marked").text() === "i" &&
        n.find("span:last-child").text().includes("tem")
      );
    })).toEqual(true);

    expect(props.disableInfiniteScroll.mock.calls.length).toBe(1);
    expect(props.disableInfiniteScroll).lastCalledWith(true);

    items.at(0).simulate("click");
    expect(props.handler.mock.calls.length).toBe(1);

    searchInput.at(0).simulate(
      "change",
      {target: {value: ""}}
    );
    expect(wrapper.state("menuItems")).toEqual(props.items);
    expect(items.at(0).text()).toEqual(props.items[0].name);
    items.at(0).simulate("click");
    expect(props.handler.mock.calls.length).toBe(2);
  });

  it("should render a message when no search results", () => {
    const props = {
      items: [{name: "item1"}, {name: "item2"}],
      handler: jest.fn(),
    };
    const wrapper = shallow(<ContextMenuItems {...props} />);
    wrapper.find(".select__search-input").at(0).simulate(
      "change",
      {target: {value: "o"}}
    );
    const items = wrapper.find(".select__option");

    expect(items).toHaveLength(1);
    expect(items.at(0).text()).toEqual("no results");

    items.at(0).simulate("click");
    expect(props.handler.mock.calls.length).toBe(0);
  });

  it("should render a message when no items", () => {
    const props = {
      items: [],
      handler: jest.fn(),
      emptyMsg: "empty",
    };
    const wrapper = shallow(<ContextMenuItems {...props} />);
    const target = wrapper.find(".select__empty");
    expect(target).toHaveLength(1);
    expect(target.at(0).text()).toEqual(props.emptyMsg);
  });

  it("should render a loader", () => {
    const props = {
      items: [{name: "item1"}],
      handler: jest.fn(),
      loadMorePending: true,
    };
    const wrapper = shallow(<ContextMenuItems {...props} />);
    expect(wrapper.find(".loader")).toHaveLength(1);
  });
});