import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import MapScreen from "../Screens/MapScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import ProfileScreen from "../Screens/ProfileScreen";

//        CONFIG's for the TabNavigator
const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen
  },
  History: {
    screen: HistoryScreen
  },
  Profile: {
    screen: ProfileScreen
  }
});

export default createAppContainer(TabNavigator);
