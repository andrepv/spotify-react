import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import Block from "components/Common/Block";
import AuthorList from "components/Common/AuthorList";
import cd from "images/cd.png";

describe("<Block />", () => {
  it("renders correctly", () => {
    const props = {
      image: "test.png",
      name: "test",
      meta: "0 tracks",
      type: "playlist",
      id: "1",
      handler: jest.fn(),
    };
    const component = renderer.create(
      <Router><Block {...props}/></Router>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("check the component without an image", () => {
    const props = {
      image: "",
      name: "test",
      meta: "0 tracks",
      type: "playlist",
      id: "1",
    };
    const wrapper = shallow(<Block {...props} />);
    const target = wrapper.find(".block__img_root");

    expect(target.hasClass("bg-empty")).toEqual(true);
    expect(target.prop("style")).toHaveProperty(
      "backgroundImage", `url(${cd})`
    );
  });

  it("should display the authors as metadata", () => {
    const props = {
      image: "test.png",
      name: "test",
      meta: [{name: "John Doe", id: "1"}],
      type: "album",
      id: "1",
    };
    const wrapper = shallow(<Block {...props} />);
    expect(wrapper.find(AuthorList)).toHaveLength(1);
  });
});