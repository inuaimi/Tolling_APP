/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
//Main navigation system
import MainNavigator from "./Navigation/MainNavigator";

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}
