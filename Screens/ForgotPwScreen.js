import React from "react";
import firebase from "react-native-firebase";
import { Text, View, ImageBackground } from "react-native";
import styles from "../Styles/forgotPwStyles";
import { Buttons } from "../Components/Buttons";
import { Inputs } from "../Components/Inputs";

export default class ForgotPwScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

  state = {
    email: "",
    error: "",
    loading: false
  };

  resetPw() {
    this.setState({ error: "", loading: true });

    firebase
      .app()
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({
          error: "",
          loading: false
        });
        alert("Check your email");
        this.props.navigation.navigate("Login");
      })
      .catch(() => {
        this.setState({
          error: "Something went wrong",
          loading: false
        });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return <Buttons onPress={this.resetPw.bind(this)}>Reset Password</Buttons>;
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../Src/Images/ForgotPwBG.jpg")}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.desc}>
            Please enter the email address registered on your account{" "}
          </Text>
          <Inputs
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            placeholderTextColor="#777777"
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrLoading()}
          <Text
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
            style={styles.backToSignInText}
          >
            {" "}
            Back to Sign in
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
