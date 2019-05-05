import React from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "../Styles/loginStyles";
import { Buttons } from '../Components/Buttons';
import { Inputs } from '../Components/Inputs';
import firebase from 'react-native-firebase';


export default class SecondScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBidTQWLb2V9YekKSrn_iXpr5UqWgAybcQ",
      authDomain: "tolling-app.firebaseapp.com",
      databaseURL: "https://tolling-app.firebaseio.com",
      projectId: "tolling-app",
      storageBucket: "tolling-app.appspot.com",
      messagingSenderId: "671174856452"
    };
    firebase.initializeApp(config);
  }

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onSignInPressed() {

    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    if (email === ''){
      this.setState({
        error: 'Email can not be empty',
        loading: false
      })
    } 
    else if (password === ''){
      this.setState({
        error: 'Please enter your password',
        loading: false
      })
    } 

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { this.setState({ error: '', loading: false });
      this.props.navigation.navigate("Map") })
      .catch(() => {
        this.setState({ error: 'Authentication failed.', loading: false });
      });
      
      
  };

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading...</Text>
    }
    return <Buttons onPress={this.onSignInPressed.bind(this)}>Log in!</Buttons>;
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
            placeholder='Email'
            placeholderTextColor='#777777'
          />
          <Inputs
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder='Password'
            placeholderTextColor="#777777"

          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrLoading()}

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
