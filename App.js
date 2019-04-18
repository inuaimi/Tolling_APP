/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
//Main navigation system
// import MainNavigator from "./Navigation/MainNavigator";
import { createMainNavigator } from "./Navigation/MainNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    const Layout = createMainNavigator(this.state.isLoggedIn);
    return <Layout />;
  }
}
