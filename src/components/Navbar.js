import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "react-feather";

import * as RouteConstant from "constants/RouteConstants";
import { ReactComponent as Home } from "images/Navbar/Home.svg";
import { ReactComponent as Layers } from "images/Navbar/Layers.svg";
import { ReactComponent as User } from "images/Navbar/User.svg";
import { ReactComponent as Heart } from "images/Navbar/Heart.svg";
import { ReactComponent as Label } from "images/Navbar/Label.svg";
import { ReactComponent as LightBulb } from "images/Navbar/LightBulb.svg";
import { ReactComponent as Lightning } from "images/Navbar/Lightning.svg";
import logo from "images/spotify-logo.png";
import SearchBtn from "components/Search/SearchBtn";
import "styles/Navbar.scss";

export default class Navbar extends Component {
  state = {
    isHidden: false,
    isMenuOpen: false,
  }

  componentDidMount() {
    this.checkWindowWidth();
    window.addEventListener("resize", this.checkWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWindowWidth);
  }

  checkWindowWidth = () => {
    this.setState({
      isHidden: window.innerWidth <= 1024,
    });
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const navbarItems = [
      { path: RouteConstant.HOME, icon: <Home />, name: "Home" },
      { path: RouteConstant.CHARTS, icon: <Lightning />, name: "Charts" },
      { path: RouteConstant.NEW, icon: <Label />, name: "New" },
      { path: RouteConstant.GENRES, icon: <LightBulb />, name: "Genres" },
      { path: RouteConstant.PLAYLISTS, icon: <Layers />, name: "Playlists" },
      { path: RouteConstant.LIKED, icon: <Heart />, name: "Songs" },
      { path: RouteConstant.ARTISTS, icon: <User />, name: "Artists" },
    ];
    const {isHidden, isMenuOpen} = this.state;
    return (
      <React.Fragment>
        {isHidden &&
          <div
            className="navbar__open-btn flex-center fixed-btn"
            onClick={this.toggleMenu}>
            {isMenuOpen ? <X /> : <Menu/>}
          </div>
        }
        <nav className={`app__navbar ${isHidden
          ? `app__navbar_mobile${isMenuOpen ? "_open" : ""}`
          : ""
        }`}>
          <div className="navbar">
            <div className="navbar__logo">
              <img className="navbar__logo-img" src={logo} alt=""/>
              <SearchBtn className="navbar__search"/>
            </div>
            <ul className="navbar__group">
              {navbarItems.slice(0, 4).map(({path, icon, name}, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                     isMenuOpen && this.toggleMenu();
                    }}
                  >
                    <NavLink
                      exact
                      to={path}
                      className="navbar__item"
                      activeClassName="active"
                    >
                      <span className="navbar__icon">{icon}</span>
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <ul className="navbar__group">
              <p className="navbar__group-header">YOUR LIBRARY</p>
              {navbarItems.slice(4, 7).map(({path, icon, name}, index) => {
                return (
                  <li
                    key={index + 4}
                    onClick={() => {
                     isMenuOpen && this.toggleMenu();
                    }}
                  >
                    <NavLink
                      exact
                      to={path}
                      className="navbar__item"
                      activeClassName="active"
                    >
                      <span className="navbar__icon">{icon}</span>
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}