import React from 'react';
import {
  Text, View, ImageBackground, Button, TouchableOpacity 
} from 'react-native';
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };
  render() {
    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('../Screens/images/profileBG.jpg')}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, width: '10%', alignSelf: 'flex-end', marginTop: -80, marginRight: 15}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Log out</Text>
        </TouchableOpacity >
        <View style={styles.profileBody}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>Name: </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>Sven Svensson</Text>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%', marginTop: 25}}>MAC-adress: </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>50:BC:95:B5:35:F1</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%', marginTop: 25}}>Reg. Number: </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>ABC 123</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%', marginTop: 25}}>Email: </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>React@native.com</Text>
          </View>
        </View>
        
      </ImageBackground>
    );
  }
}