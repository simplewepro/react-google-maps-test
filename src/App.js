import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Map from "./components/Map";
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            vertical
            visible
            width="wide"
          >
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>

          <Map />
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
