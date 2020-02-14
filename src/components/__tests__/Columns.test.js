import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Columns from "components/Common/Columns";

describe("<Columns />", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Columns amount={2}>
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 3</div>
        <div>Block 4</div>
      </Columns>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should not render columns", () => {
    const wrapper = mount(
      <Columns amount={1}>
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 3</div>
      </Columns>
    );
    expect(wrapper.find(".column")).toHaveLength(0);
  });

  it("should wrap every block in the single column", () => {
    const wrapper = mount(
      <Columns amount={3}>
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 3</div>
      </Columns>
    );
    expect(wrapper.find(".column")).toHaveLength(3);
    expect(wrapper.find(".column").everyWhere(n => {
      return n.children().length === 1;
    })).toEqual(true);
  });

  it("the first column should have the two blocks", () => {
    const wrapper = mount(
      <Columns amount={2}>
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 3</div>
      </Columns>
    );
    expect(wrapper.find(".column")).toHaveLength(2);
    expect(wrapper.find(".column:first-child").children()).toHaveLength(2);
    expect(wrapper.find(".column:last-child").children()).toHaveLength(1);
  });
});