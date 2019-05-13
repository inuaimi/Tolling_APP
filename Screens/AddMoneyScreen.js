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
  Header, Card, ListItem, Divider, Button
} from "react-native-elements";                       
import styles from '../Styles/profileStyles'
import { addUserMoney } from '../Database/Database';
import firebase from "react-native-firebase";

export default class AddMoneyScreen extends React.Component {

  static navigationOptions = {
    title: "Add money",
  };

  constructor() {
    super()

    this.state = {
      uid: firebase.app().auth().currentUser.uid
    }
  }

  addUserMoney = () => {
    const { money } = this.state;
    addUserMoney(money, this.state.uid);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <View>
          <Card>
            <TextInput 
              placeholder="Amount" 
              style={localStyles.text} 
              onChangeText={(text) => this.setState({ money: Number(text)})}>
            </TextInput>
          </Card>
          <TouchableOpacity style={localStyles.addButton} onPress={() => this.addUserMoney()}>
            <Text style={localStyles.btnText}> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  text: {
    fontSize: 14,
    textAlign: "center"
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#2ecc71'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});

