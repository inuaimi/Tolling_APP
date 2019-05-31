/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
//Main navigation system
import { createMainNavigator } from "./Navigation/MainNavigator";
import firebase from "react-native-firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Boolean
    };
  }

  render() {
    const Layout = createMainNavigator(this.state.isLoggedIn);
    return <Layout />;
  }

  async componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  };
}
