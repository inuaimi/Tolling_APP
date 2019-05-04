import React from "react";
import { Text, View, ImageBackground } from "react-native";

import styles from "../Styles/loginStyles";
import { Buttons } from '../Components/Buttons';
import { Inputs } from '../Components/Inputs';

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };
  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../Src/Images/BackgroundPicLoginScreen.jpg")}
      >
        <View style={styles.container1}>
          <Text style={styles.title}>Sign in</Text>
          <Inputs 
            placeholder='Email'
            placeholderTextColor='#777777'
          />
          <Inputs
            placeholder='Password'
            placeholderTextColor = "#777777"
            secureTextEntry
          />
          <Buttons
            onPress={() => {
              this.props.navigation.navigate("LoggedIn");
            }}>LOG IN</Buttons>
          
          <Text style={styles.forgotPw}>
            Forgot password |{" "}
            <Text
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
              style={styles.signupText}
            >Sign Up</Text>
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
