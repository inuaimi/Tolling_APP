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

//        CONFIG's for the TabNavigator
const StackNavigator = createStackNavigator(
  {
    Home: TestHomeScreen,
    Add: AddScreen,
    List: ListScreen
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
