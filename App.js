/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
//      Import TabNavigator configs.
import TabNavigator from "./Navigation/TabNavigator";
import MainNavigator, { createMainNavigator } from "./Navigation/MainNavigator";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import ProfileScreen from "./Screens/ProfileScreen";

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}
