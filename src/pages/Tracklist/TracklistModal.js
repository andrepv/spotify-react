import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "styles/Tracklist.scss";

export class TracklistModal extends Component {
  componentDidMount() {
    if (!document.body.classList.contains("disable-scroll")) {
      document.body.classList.add("disable-scroll");
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("disable-scroll");
  }

  goBack = e => {
    if (e.target.closest(".tracklist__modal")) {
      return;
    }
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        className="tracklist__overlay"
        onClick={this.goBack}
      >
        <div className="tracklist__modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(TracklistModal);