import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import OpenContextMenuButton from "components/Common/OpenContextMenuButton";

describe("<OpenContextMenuButton />", () => {
  it("renders correctly", () => {
    const props = {
      renderContextMenu: closeContextMenu => {
        return (
          <div onClick={closeContextMenu}>
            Menu
          </div>
        );
      },
      renderContent: toggleContextMenu => {
        return (
          <span onClick={toggleContextMenu}>
            Open Menu
          </span>
        );
      },
      className: "test",
    };
    const component = renderer.create(
      <OpenContextMenuButton {...props} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should toggle context menu correctly", () => {
    const props = {
      renderContextMenu: jest.fn(),
      renderContent: jest.fn(),
    };
    const wrapper = shallow(<OpenContextMenuButton {...props}/>);
    expect(props.renderContent.mock.calls.length).toBe(1);
    expect(props.renderContent).lastCalledWith(expect.any(Function));

    wrapper.setState({isContextMenuOpen: true});
    expect(props.renderContextMenu.mock.calls.length).toBe(1);
    expect(props.renderContextMenu).lastCalledWith(expect.any(Function));
    expect(wrapper.find(".more-btn_active")).toHaveLength(1);

    wrapper.setState({isContextMenuOpen: false});
    expect(wrapper.find(".more-btn_active")).toHaveLength(0);
    expect(props.renderContextMenu.mock.calls.length).toBe(1);
  });
});