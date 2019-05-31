import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Header, Card, ListItem, Divider, Button } from "react-native-elements";
import styles from "../Styles/profileStyles";
import { deleteUserVehicle } from "../Database/Database";
import firebase from "react-native-firebase";

export default class VehicleScreen extends React.Component {
  static navigationOptions = {
    title: "Vehicle Info"
  };

  constructor() {
    super();

    this.state = {
      ready: false
    };
  }

  componentDidMount = () => {
    const vehicle = this.props.navigation.state.params;
    console.log("vehicle: " + JSON.stringify(vehicle, null, 2));
    this.setState({
      vehicle: vehicle,
      licensePlate: vehicle.licensePlate,
      type: vehicle.type
    });
    this.state.ready = true;
  };

  render() {
    if (!this.state.ready) {
      return null;
    }
    const { vehicle, licensePlate, type } = this.state;

    return (
      <View style={localStyles.mainContainer}>
        <View>
          <Card>
            <ListItem
              title={<Text style={localStyles.leftText}> License plate </Text>}
              rightTitle={
                <Text style={styles.rightText}> {licensePlate} </Text>
              }
              Divider
            />
            <ListItem
              title={<Text style={localStyles.leftText}> Vehicle type </Text>}
              rightTitle={<Text style={localStyles.rightText}> {type} </Text>}
            />
            <TouchableOpacity
              style={localStyles.deleteButton}
              onPress={() => this.deleteVehicle(vehicle)}
            >
              <Text style={localStyles.btnText}> Delete </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  }

  deleteVehicle = vehicle => {
    const uid = firebase.app().auth().currentUser.uid;
    deleteUserVehicle(vehicle, uid);
    this.props.navigation.goBack();
  };
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  rightText: {
    textAlign: "center"
  },
  leftText: {
    fontWeight: "bold"
  },
  deleteButton: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#EA2027"
  },
  btnText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold"
  }
});
