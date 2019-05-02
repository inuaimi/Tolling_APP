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
const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen
  },
  History: {
    screen: HistoryScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Test: {
    screen: StackNavigator
  }
});

export default createAppContainer(TabNavigator);
