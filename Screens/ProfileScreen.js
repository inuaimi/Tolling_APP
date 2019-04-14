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

  constructor() {
    super()
    this.state = {
      name: 'Sven Svensson',
      macAdress: '50:BC:95:B5:35:F1',
      regNmr: 'ABC 123',
      email: 'React@native.com'
    }
  }

  updateText = () => {
    this.setState({name: 'Bengt Bengtsson'})
  }

  render() {
    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('../Screens/images/profileBG.jpg')}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, width: '10%', alignSelf: 'flex-end', marginTop: -80, marginRight: 15}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Log out</Text>
        </TouchableOpacity >
        <View style={styles.profileBody}>
        {/* klickar man på Name: så ändras namnet, kanske användbart någonstans? typ när infon om gantrys ska ändras om man klickar på en */}
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}} onPress={this.updateText}>Name: </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: '15%'}}>{this.state.name}</Text>
          <View>
            <Text style={styles.profileTextMargin}>MAC-adress: </Text>
            <Text style={styles.profileText}>{this.state.macAdress}</Text>
            <Text style={styles.profileTextMargin}>Reg. Number: </Text>
            <Text style={styles.profileText}>{this.state.regNmr}</Text>
            <Text style={styles.profileTextMargin}>Email: </Text>
            <Text style={styles.profileText}>{this.state.email}</Text>
          </View>
        </View>
        
      </ImageBackground>
    );
  }
}