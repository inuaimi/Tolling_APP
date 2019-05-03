import React from "react";
import { Icon } from "react-native-elements";

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import MapScreen from "../Screens/MapScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import TestHomeScreen from "../Screens/TestHomeScreen";
import AddScreen from "../Screens/AddScreen";
import ListScreen from "../Screens/ListScreen";
import BeaconsScreen from "../Screens/BeaconsScreen";
import theme from "../Styles/theme";

//        CONFIG's for the TabNavigator
const StackNavigator = createStackNavigator(
  {
    Home: TestHomeScreen,
    Add: AddScreen,
    List: ListScreen,
    Beacons: BeaconsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const historyStack = createStackNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR
      }
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: <Icon name="map-marker" type="font-awesome" />
    }
  },
  History: {
    screen: historyStack,
    navigationOptions: {
      tabBarIcon: <Icon name="history" type="font-awesome" />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: <Icon name="user-circle" type="font-awesome" />
    }
  },
  Test: {
    screen: StackNavigator
  }
});

export default createAppContainer(TabNavigator);
