import React from "react";
import ReactDOM from "react-dom";
import AlertManager from "./AlertManager";

class Alert {
  constructor() {
    let alertContainer;
    const existingAlertContainer = document.getElementById("alert");
    if (existingAlertContainer) {
      alertContainer = existingAlertContainer;
    } else {
      const container = document.createElement("div");
      container.id = "alert";
      container.className = "alert__container";
      document.body.appendChild(container);
      alertContainer = container;
    }

    ReactDOM.render(
      <AlertManager show={fn => this.createAlert = fn} />,
      alertContainer
    );
  }

  show = message => {
    if (this.createAlert) {
      this.createAlert(message);
    }
  }
}

const alert = new Alert();
export default alert;