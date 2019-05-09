import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  SwitchNavigator
} from "react-navigation";
import { AsyncStorage } from "react-native";

import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import TabNavigator from "./TabNavigator";

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen
});

export const createMainNavigator = (isLoggedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        LoggedOut: LoginStack,
        LoggedIn: TabNavigator
      },
      {
        initialRouteName: isLoggedIn ? "LoggedIn" : "LoggedOut"
        // initialRouteName: "LoggedOut"
      }
    )
  );
};
