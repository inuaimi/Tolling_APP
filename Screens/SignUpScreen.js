import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Picker } from 'react-native';


import { Inputs } from '../Components/Inputs';
import { Buttons } from '../Components/Buttons';
import { createUser } from '../Database/Database';
import firebase from 'react-native-firebase';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

    state = {
      name: '',
      email: '',
      password: '',
      vehicle: 'Car',
      license: '',
      error: '',
      loading: false,
    }

  onPressSignUp() {
    this.setState({
      error: '',
      loading: true
    });
    const { name, email, password, vehicle, license } = this.state;
    
    //Verify the users input
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let pwMin = 6;
    if (name === ''){
      this.setState({
        error: 'Please enter your name',
        loading: false
      })
    }
    else if (emailReg.test(email) === false){
      this.setState({
        error: 'Please enter a correct email',
        loading: false
      })
    }
    else if (password === '' || password.length < pwMin){
      this.setState({
        error: 'Please enter a password with atleast 6 characters',
        loading: false
      })
    }    
    else if (vehicle === ''){
      this.setState({
        error: 'Please enter your type of vehicle',
        loading: false
      })
    }
    else if (license === ''){
      this.setState({
        error: 'Please enter your license plate',
        loading: false
      })
    }
 
    
    firebase.app().auth().createUserWithEmailAndPassword(email, password)
      .then(() => { this.setState({
        error: '',
        loading: false
      });
      createUser(
        this.state.name,
        this.state.email,
        this.state.vehicle,
        this.state.license
      )
      this.props.navigation.navigate("Login")
      })
      .catch(() => { this.setState({
        error: 'Failed to sign up. Try again.',
        loading: false
        })
      })  
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading...</Text>
    }
    return <Buttons onPress={this.onPressSignUp.bind(this)}>Sign up</Buttons>;
  }

  render(){
  return (
    <ImageBackground
      source={require('../Src/Images/signup.jpg')}
      style={styles.imgContainer}>
    <View style={styles.container}>
    <Text style={styles.text}>Sign up</Text>
      <Inputs 
        placeholder='Full name'
        placeholderTextColor="#777777"
        onChangeText={name => this.setState({ name })}
        value={this.state.name}
      />
      <Inputs 
        placeholder='Email'
        placeholderTextColor='#777777'
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <Inputs
        placeholder='Password'
        placeholderTextColor = "#777777"
        secureTextEntry
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
      />
      <Inputs
        placeholder='License plate'
        placeholderTextColor='#777777'
        onChangeText={license => this.setState({ license })}
        value={this.state.license}
      />
      <Picker
        itemStyle= {styles.pickerItem}
        style={styles.dropdown}
        selectedValue={this.state.vehicle}

        onValueChange={(vehicle) => this.setState({vehicle: vehicle})} >

        <Picker.Item label="Car" value="Car" />
        <Picker.Item label="Van" value="Van" />
        <Picker.Item label="Truck" value="Truck" />
        <Picker.Item label="Bus" value="Bus" />
        <Picker.Item label="Motorcycle" value="Motorcycle" />
  
      </Picker>

      <View style={styles.vehicleText}>
        <Text style={styles.vehicle}>Chosen vehicle: {this.state.vehicle}</Text>
      </View>
      
        {this.renderButtonOrLoading()}
        <Text style = {{ color: '#ff0000', marginTop: 10, fontSize: 16 }}>{this.state.error}</Text>
        <Text style={styles.login}>Already have an account? <Text onPress={() => this.props.navigation.navigate("Login")} style = {{ color: '#fff' }}>Log in</Text></Text>
    </View>
    </ImageBackground>
    );
  }
}

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
    marginTop: 10,
    color: '#000',
    fontSize: 18,
  },
  vehicleText: {
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    backgroundColor: '#000',
  },
  vehicle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  dropdown: {
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    backgroundColor: '#000',
  },
  pickerItem: {
    color: '#fff',
    height: 130,
    fontSize: 24,
  },
})