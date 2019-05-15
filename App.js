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
// import AsyncStorage from "@react-native-community/async-storage";
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
    // let val = await this.checkIfLoggedIn();
    this.checkIfLoggedIn();
    console.log("_application isloggedIn: ", val);
    // this.setState({ isLoggedIn: val });
  }

  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  };

  // checkIfLoggedIn = async () => {
  //   try {
  //     const val = await AsyncStorage.getItem("isLoggedIn");
  //     if (val === "true") {
  //       return true;
  //     }
  //     return false;
  //   } catch {
  //     //Handle error
  //   }
  // };
}
