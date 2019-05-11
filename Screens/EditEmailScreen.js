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

import { editUserEmail } from '../Database/Database';

export default class EditEmail extends React.Component {
  static navigationOptions = {
      title: "Edit Email",
    };
  
  constructor() {
    super()

    this.state = {
      ready: false
    }
  }

  componentDidMount = () => {
    const email = this.props.navigation.state.params;
    console.log("email in mount: " + JSON.stringify(email, null, 2));
    this.setState({
      email: email,
      newEmail: email
    });
    this.state.ready = true;
  }

  

  render() {

    if(!this.state.ready) {
      return null;
    }

    const { email } = this.state;
    console.log("email in mount: " + JSON.stringify(email, null, 2));

    return (
      <View>
        <Card title="Current email">
          <Text style={localStyles.emailText}>{email}</Text>
        </Card>

        <Card>
          <TextInput
            placeholder="Enter new email here!"
            onChangeText={(text) => this.setState({newEmail: text})}>
          </TextInput>
        </Card>

        <TouchableOpacity style={localStyles.editEmailBtn}
        onPress={() => this.editEmail(this.state.newEmail)}>
          <Text style={localStyles.btnText}> Save changes </Text>
        </TouchableOpacity>

      </View>
    )
  }

  editEmail = (newEmail) => {
    editUserEmail(newEmail);
    this.props.navigation.goBack();
  }
}

const localStyles = StyleSheet.create({
  editEmailBtn: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#ff7f50'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  emailText: {
    fontSize: 14,
    textAlign: "center"
  }
})