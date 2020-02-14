import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import AlertMessage from "./AlertMessage";

export default class AlertManager extends Component {
  static idCounter = 0;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    props.show(this.createAlert);
  }

  createAlert = message => {
    const id = ++AlertManager.idCounter;
    this.setState({
      items: [
        ...this.state.items,
        {id, message},
      ],
    });
  }

  removeAlert = id => {
    this.setState({
      items: this.state.items.filter(item => {
        return item.id !== id;
      }),
    });
  }

  render() {
    return (
      <TransitionGroup component={null}>
        {this.state.items.map(item => {
          return (
            <CSSTransition
              key={item.id}
              timeout={800}
              classNames="alert"
            >
              <div className="alert">
                <AlertMessage
                  id={item.id}
                  message={item.message}
                  remove={this.removeAlert}
                />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }
}

AlertManager.propTypes = {
  show: PropTypes.func.isRequired,
};