import React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from "react-native";
import {
  Header,
  Card,
  ListItem,
  Divider,
  CheckBox,
  Button,
  Icon
} from "react-native-elements";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/profileStyles";
import { db } from "../Database/Database";
import theme from "../Styles/theme";

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={navigation.getParam("signOutUser")}
        >
          <Icon name="logout" type="material-community" color="white" />
        </TouchableOpacity>
      )
    };
  };

  constructor() {
    super();
    this.ref = db.collection("Users").doc("XO5lwKAyI3PaEpGQ2bZ4");
    this.unsubscribe = null;

    this.state = {
      vehicles: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.props.navigation.setParams({ signOutUser: this._signOutUser });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = doc => {
    const user = doc.data();

    this.setState({
      email: user.email,
      name: user.name,
      vehicles: user.vehicles
    });
  };

  _signOutUser = async () => {
    try {
      await firebase
        .app()
        .auth()
        .signOut();
      this.saveSignedOutState();
      this.props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  saveSignedOutState = async () => {
    console.log("_application, Hello from saveSignedOutState");
    //overwrite login data
    try {
      await AsyncStorage.multiSet([
        ["email", ""],
        ["password", ""],
        ["isLoggedIn", "false"]
      ]);
    } catch {
      console.log("Error saving signed out state");
    }
  };

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <ScrollView>
          <View style={localStyles.moneyContainer}>
            <Card title="Name">
              <Text style={localStyles.balanceText}> {this.state.name} </Text>
            </Card>
          </View>

          <View style={localStyles.moneyContainer}>
            <Card title="Email">
              <Text style={localStyles.balanceText}> {this.state.email} </Text>
            </Card>
          </View>

          <View style={localStyles.moneyContainer}>
            {this.renderVehicles()}
          </View>
          <TouchableOpacity
            style={localStyles.addVehicleButton}
            onPress={() => this.props.navigation.navigate("AddVehicle")}
          >
            <Text style={localStyles.btnText}>Add vehicle</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  renderVehicles() {
    return (
      <Card title="Vehicles">
        {this.state.vehicles.map((vehicle, key) => {
          return (
            <View key={key}>
              <ListItem
                title={vehicle.licensePlate}
                onPress={() =>
                  this.props.navigation.navigate("Vehicle", {
                    licensePlate: vehicle.licensePlate,
                    type: vehicle.type
                  })
                }
                chevron
              />
              <Divider />
            </View>
          );
        })}
      </Card>
    );
  }
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  balanceText: {
    fontSize: 14,
    textAlign: "center"
  },
  addVehicleButton: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: theme.PRIMARY_COLOR
  },
  logoutButton: {
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
