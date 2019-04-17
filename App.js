/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
//import { Firebase } from './Components/Firebase';
import { Input } from './Components/Input';
import { Button } from './Components/Button';

export default class App extends React.Component {

  //ref = firebase.firestore.collection('Users');

  state = {
    name: '',
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  /*componentWillMount() {
    Firebase.init();
  }

  onPressSignUp() {
    const { email, password } = this.state;

    Firebase.auth.createUserWithEmailAndPassword(email, password)
      .then(user => this.setState({
        name: this.state,
        authenticating: false,
        user,
        error: '',
      }),
      this.ref.add({
        name: this.state.name,
        email: this.state.email,
      })
      )
      .catch(() => this.setState({
        authenticating: false,
        user: null,
        error: 'Failed to sign up. Try again.',
      }))
  }

  onPressLogOut() {
    Firebase.auth.signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.container}>
          <Text>Log in form goes here</Text>
          <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
        </View>
      )
    }*/

    render(){
    return (
      <ImageBackground
        source={require('./Images/signup.jpg')}
        style={styles.imgContainer}>
      <View style={styles.container}>
      <Text style={styles.text}>Sign up</Text>
        <Input 
          placeholder='Full name'
          placeholderTextColor="#777777"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <Input 
          placeholder='Email'
          placeholderTextColor='#777777'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Password'
          placeholderTextColor = "#777777"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => console.log('Sign up pressed')}>Sign up</Button>
          <Text style={styles.login}>Already have an account? <Text onPress={() => console.log('Log in pressed')} style = {{ color: '#fff' }}>Log in</Text></Text>
          <Text style = {{ color: '#ff0000', marginTop: 20, fontSize: 20 }}>{this.state.error}</Text>
      </View>
      </ImageBackground>
      );
    }
  }

  /*render() {
    return (
      <View style={styles.imgContainer}>
        {this.renderCurrentState()}
      </View>
    );
  }
}*/

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(160, 204, 242, .4)'
    },
    text: {
      marginBottom: 30,
      color: '#fff',
      fontWeight: '400',
      fontSize: 32,
    },
    imgContainer: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    login: {
      marginTop: 20,
      color: '#000',
      fontSize: 18,
    },
    form: {
      flex: 1
    }
  })







/*
export default class App extends React.Component {
  render() {
    return <TabNavigator />;
  }
}*/