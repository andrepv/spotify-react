import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";

import SearchResults from "components/Search/SearchResults";
import { SearchBtn } from "components/Search/SearchBtn";
import { Search } from "components/Search/Search";
import { initialSearchResultsState } from "reducers/SearchReducer";

describe("<Search />", () => {
  it("renders correctly", () => {
    const props = {
      toggleSearch: jest.fn(),
      filterByType: jest.fn(),
      loadSearchResults: jest.fn(),
      searchResults: {
        ...initialSearchResultsState,
        isOpen: true,
      },
    };
    const component = renderer.create(
      <Search {...props} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should toggle the search bar", () => {
    const props = {
      toggleSearch: jest.fn(),
    };
    const wrapper = shallow(<SearchBtn {...props}/>);
    wrapper.find("div").simulate("click");
    expect(props.toggleSearch.mock.calls.length).toBe(1);

    wrapper.find("div").simulate("click");
    expect(props.toggleSearch.mock.calls.length).toBe(2);
  });

  it("should close search bar", () => {
    const props = {
      toggleSearch: jest.fn(),
      filterByType: jest.fn(),
      loadSearchResults: jest.fn(),
      searchResults: {
        ...initialSearchResultsState,
        isOpen: true,
        pending: true,
      },
    };
    const wrapper = mount(<Search {...props}/>);
    expect(wrapper.find(".search__loader")).toHaveLength(1);

    wrapper.find(".search__close").simulate("click");
    expect(props.toggleSearch.mock.calls.length).toBe(1);
  });

  it("search results bar should open when a user enter a value", () => {
    const props = {
      toggleSearch: jest.fn(),
      filterByType: jest.fn(),
      loadSearchResults: jest.fn(),
      searchResults: {
        ...initialSearchResultsState,
        isOpen: true,
      },
    };
    const wrapper = mount(<Search {...props}/>);
    wrapper.find(".search__input-field").simulate("change", {
      target: { value: "test" },
    });
    expect(wrapper.find(".search__results")).toHaveLength(1);
  });

  it("the click on a tab should toggle search results", () => {
    const props = {
      value: "test",
      type: "track",
      switchTab: jest.fn(),
      items: [{}, {}, {}],
      close: jest.fn(),
      pending: false,
    };
    const wrapper = shallow(<SearchResults {...props}/>);
    expect(wrapper.find(".search__tab_active")).toHaveLength(1);
    expect(wrapper.find(".tracks")).toHaveLength(1);

    wrapper.find(".search__tab").at(3).simulate("click");
    expect(props.switchTab.mock.calls.length).toBe(1);

    wrapper.setProps({
      type: "artist",
      items: [{id: "test", image: "test.png", name:"test"}],
    });
    expect(wrapper.find(".tracks")).toHaveLength(0);
    expect(wrapper.find(".artists")).toHaveLength(1);
  });
});