import React from "react";
import ReactDOM from "react-dom";

import './withPortal.css';

const withPortal = Modal => {
  return class extends React.Component {

    constructor(props) {
      super(props);

      this.rootSelector = document.getElementById("root");
      this.container = document.createElement("div");
      this.container.className = 'portalWrapper';
    }

    componentDidMount() {
      this.rootSelector.appendChild(this.container);
    }

    componentWillUnmount() {
      this.rootSelector.removeChild(this.container);
    }

    render() {
      return ReactDOM.createPortal(<Modal { ...this.props } />, this.container);
    }
  };
}

export default withPortal;