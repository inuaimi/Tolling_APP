import React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  StatusBar,
  Picker
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
// import AsyncStorage from "@react-native-community/async-storage";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/profileStyles";
import { db } from "../Database/Database";
import theme from "../Styles/theme";
import { saveActiveVehicle } from "../Database/Database";

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
    const uid = firebase.app().auth().currentUser.uid;
    this.ref = db.collection("Users").doc(uid);
    this.unsubscribe = null;

    this.state = {
      vehicles: [],
      uid: uid,
      activeVehicle: ""
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
    });
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.props.navigation.setParams({ signOutUser: this._signOutUser });
  }

  componentWillUnmount() {
    this._navListener.remove();
    this.unsubscribe();
  }

  onCollectionUpdate = doc => {
    const user = doc.data();

    this.setState({
      email: user.email,
      name: user.name,
      vehicles: user.vehicles,
      activeVehiclePlate: user.activeVehiclePlate
    });
  };

  _signOutUser = async () => {
    try {
      await firebase
        .app()
        .auth()
        .signOut();
      // this.saveSignedOutState();
      this.props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  saveActiveVehicle = () => {
    const { activeVehicle, uid } = this.state;
    let vehicleType;
    this.state.vehicles.forEach(vehicle => {
      if (vehicle.licensePlate === activeVehicle) {
        vehicleType = vehicle.type;
      }
    });
    saveActiveVehicle(vehicleType, activeVehicle, uid);
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
              <View>
                <ListItem
                  title={
                    <Text style={localStyles.emailText}>
                      {" "}
                      {this.state.email}{" "}
                    </Text>
                  }
                />
              </View>
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

          <View>
            <Card
              title={
                <Text style={localStyles.activeVehicleStyle}>
                  Active vehicle: {this.state.activeVehiclePlate}
                </Text>
              }
            >
              <Divider />
              <Picker
                selectedValue={this.state.activeVehicle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ activeVehicle: itemValue })
                }
              >
                {this.renderPickerItem()}
              </Picker>
            </Card>
            <TouchableOpacity
              style={localStyles.addVehicleButton}
              onPress={() => this.saveActiveVehicle()}
            >
              <Text style={localStyles.btnText}>Save active vehicle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPickerItem() {
    return this.state.vehicles.map((vehicle, key) => {
      return (
        <Picker.Item
          label={vehicle.licensePlate}
          value={vehicle.licensePlate}
        />
      );
    });
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
    fontSize: 16,
    textAlign: "center"
  },
  addVehicleButton: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: theme.ACCENT_COLOR
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
  },
  emailText: {
    fontSize: 16
  },
  activeVehicleStyle: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 15
  }
});
