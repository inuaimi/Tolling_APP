import React from "react";
import { Icon } from "react-native-elements";

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import MapScreen from "../Screens/MapScreen";
import transactionsScreen from "../Screens/TransactionsScreen";
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

const transactionsStack = createStackNavigator({
  Transactions: {
    screen: transactionsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="map-marker" type="font-awesome" color={tintColor} />
        )
      }
    },
    Transactions: {
      screen: transactionsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" type="font-awesome" color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user-circle" type="font-awesome" color={tintColor} />
        )
      }
    },
    Test: {
      screen: StackNavigator
    }
  },
  {
    tabBarOptions: {
      activeTintColor: theme.PRIMARY_COLOR
    }
  }
);

export default createAppContainer(TabNavigator);
