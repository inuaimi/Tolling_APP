import React from "react";
import { Text, View, ImageBackground, StatusBar } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import styles from "../Styles/loginStyles";
import { Buttons } from "../Components/Buttons";
import { Inputs } from "../Components/Inputs";
import firebase from "react-native-firebase";

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  onSignInPressed() {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;

    if (email === "") {
      this.setState({
        error: "Email can not be empty",
        loading: false
      });
    } else if (password === "") {
      this.setState({
        error: "Please enter your password",
        loading: false
      });
    }

    firebase
      .app()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false
        });
        // this.saveLoginData();
        // this.props.navigation.navigate("Map");
        const user = firebase.app().auth().currentUser;
        console.log(user);
        if (user.emailVerified) {
          this.setState({
            error: "",
            loading: false
          });
          this.props.navigation.navigate("Map");
        } else {
          alert("Please verify email to sign in.");
          this.setState({
            error: error.code,
            loading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Authentication failed.",
          loading: false
        });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return <Buttons onPress={this.onSignInPressed.bind(this)}>Sign in</Buttons>;
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../Src/Images/BackgroundPicLoginScreen.jpg")}
      >
        <View style={styles.container1}>
          <Text style={styles.title}>Sign in</Text>
          <Inputs
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="Email"
            placeholderTextColor="#777777"
          />
          <Inputs
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#777777"
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrLoading()}

          <Text
            onPress={() => {
              this.props.navigation.navigate("ForgotPw");
            }}
            style={styles.forgotPw}
          >
            Forgot password |{" "}
            <Text
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
              style={styles.signupText}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
