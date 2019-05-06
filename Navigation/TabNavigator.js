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
import VehicleScreen from "../Screens/VehicleScreen";
import AddVehicleScreen from "../Screens/AddVehicleScreen";

//        CONFIG's for the TabNavigator
const StackNavigator = createStackNavigator(
  {
    Home: TestHomeScreen,
    Add: AddScreen,
    List: ListScreen,
    Beacons: BeaconsScreen,
  },
  {
    initialRouteName: "Home"
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    Home: ProfileScreen,
    Vehicle: VehicleScreen,
    AddVehicle: AddVehicleScreen
  },
  {
    initialRouteName: "Home",
    // headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen
  },
  History: {
    screen: HistoryScreen
  },
  Profile: {
    screen: ProfileStackNavigator
  },
  Test: {
    screen: StackNavigator
  }
});

export default createAppContainer(TabNavigator);
