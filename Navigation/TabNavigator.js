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
import VehicleScreen from "../Screens/VehicleScreen";
import AddVehicleScreen from "../Screens/AddVehicleScreen";
import theme from "../Styles/theme";
import EditEmailScreen from "../Screens/EditEmailScreen";

const ProfileStackNavigator = createStackNavigator(
  {
    Home: ProfileScreen,
    Vehicle: VehicleScreen,
    AddVehicle: AddVehicleScreen,
    EditEmail: EditEmailScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR
      },
      headerTintColor: "#fff"
    }
  }
);

const transactionsStack = createStackNavigator({
  Transactions: {
    screen: transactionsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR
      },
      statusBar: { style: "light-content", tintColor: "#ef5350" },
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
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user-circle" type="font-awesome" color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: theme.PRIMARY_COLOR
    }
  }
);

export default createAppContainer(TabNavigator);
