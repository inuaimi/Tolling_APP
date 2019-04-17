/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
                                                    //      Import TabNavigator configs.
import TabNavigator from './Navigation/TabNavigator';
import LoginScreen from './Screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return <LoginScreen />;
    //return <TabNavigator />;
  }
}