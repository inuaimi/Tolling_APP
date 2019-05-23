import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Picker
} from "react-native";
import { Header, Card, ListItem, Divider, Button } from "react-native-elements";
import styles from "../Styles/profileStyles";
import { addUserVehicle } from "../Database/Database";
import firebase from "react-native-firebase";
import theme from "../Styles/theme";

export default class AddVehicleScreen extends React.Component {
  static navigationOptions = {
    title: "Add Vehicle"
  };

  constructor() {
    super();
    this.state = {
      type: "Car",
      licensePlate: ""
    };
  }

  addUserVehicle = () => {
    var uid = firebase.auth().currentUser.uid;
    const { licensePlate, type } = this.state;
    if (licensePlate === "") {
      alert("License plate can't be empty");
      return;
    } else {
      addUserVehicle(licensePlate, type, uid);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <View>
          <Card title="License plate">
            <TextInput
              placeholder="ABC123"
              style={localStyles.text}
              onChangeText={text => this.setState({ licensePlate: text })}
            />
          </Card>
          <Card title="Type">
            <View>
              <Picker
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ type: itemValue })
                }
              >
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Truck" value="Truck" />
                <Picker.Item label="Bus" value="Bus" />
                <Picker.Item label="Motorcycle" value="Motorcycle" />
              </Picker>
            </View>
          </Card>
          <TouchableOpacity
            style={localStyles.addButton}
            onPress={() => this.addUserVehicle()}
          >
            <Text style={localStyles.btnText}> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    backgroundColor: theme.ACCENT_COLOR
  },
  btnText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold"
  }
});
