import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import Artist from "components/Common/Artist";
import musician from "images/musician.png";

describe("<Artist />", () => {
  it("renders correctly", () => {
    const props = {
      id: "1",
      name: "test",
      handler: jest.fn(),
      image: "test.png",
    };
    const component = renderer.create(
      <Router><Artist {...props}/></Router>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("check the component without an image", () => {
    const props = {
      id: "1",
      name: "test",
      image: "",
    };
    const wrapper = shallow(<Artist {...props} />);
    const target = wrapper.find(".artist__pic_root");
    expect(target.hasClass("bg-empty")).toEqual(true);
    expect(target.prop("style")).toHaveProperty(
      "backgroundImage", `url(${musician})`
    );
  });
});