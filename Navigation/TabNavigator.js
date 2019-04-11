import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import MapScreen from '../Screens/MapScreen'
import HistoryScreen from '../Screens/HistoryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import TestScreen from '../Screens/TestScreen';

//        CONFIG's for the TabNavigator
const TabNavigator = createBottomTabNavigator(
  {
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
      screen: TestScreen
    }
  },
);

export default createAppContainer(TabNavigator);