import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  SwitchNavigator
} from "react-navigation";

import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import TabNavigator from "./TabNavigator";

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen
});

// const MainNavigator = createSwitchNavigator({
//   Login: LoginStack,
//   Tabs: TabNavigator
// });

// export default createAppContainer(MainNavigator);

export const createMainNavigator = (isLoggedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        LoggedOut: LoginStack,
        LoggedIn: TabNavigator
      },
      {
        initialRouteName: isLoggedIn ? "LoggedIn" : "LoggedOut"
      }
    )
  );
};
