import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import AuthorList from "components/Common/AuthorList";

describe("<AuthorList />", () => {
  it("renders correctly", () => {
    const props = {
      authors: [
        {name: "John Doe", id: "1"},
        {name: "Mike", id: "2"},
      ],
      handler: jest.fn(),
    };
    const component = renderer.create(
      <Router><AuthorList {...props}/></Router>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("check the component with the single author", () => {
    const props = {
      authors: [{name: "John Doe", id: "1"}],
      handler: jest.fn(),
    };
    const wrapper = shallow(<Router><AuthorList {...props} /></Router>);
    expect(wrapper.html()).toEqual(
      "<a href=\"/artist/1\"><span>John Doe</span></a>"
    );
  });
});