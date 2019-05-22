import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native';

import {
  Header, 
  Card, 
  ListItem, 
  Divider, 
  Button
} from "react-native-elements";  

import firebase from 'react-native-firebase';


export default class ActiveCarScreen extends React.Component {

  static navigationOptions = {
    title: "Active vehicle",
  };

  constructor() {
    super()
    this.state = {
      activeCar: "",
    }
  }

  render() {
    return (
      <View>
        <Picker
        selectedValue={this.state.activeCar}
        onValueChange={(itemValue, itemIndex) =>
        this.setState({activeCar: itemValue})
        }>

        </Picker>
      </View>
    )
  }

}