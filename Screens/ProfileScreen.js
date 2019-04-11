import React from 'react';
import {
  Text, View, ImageBackground
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
        <View style={styles.profileBody}>
          <Text style={{fontSize: 18, marginLeft: '15%'}}>Name: </Text>
          <Text style={{fontSize: 18, marginLeft: '15%'}}>Sven Svensson</Text>
          <View>
            <Text style={{fontSize: 18, marginLeft: '15%', marginTop: 25}}>MAC-adress</Text>
          </View>
        </View>
        
      </ImageBackground>
    );
  }
}