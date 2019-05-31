import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Picker
} from "react-native";
import {
  Card,
  ListItem,
  Divider,
  Icon,
  normalize
} from "react-native-elements";
import firebase from "react-native-firebase";
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
              <Text style={localStyles.balanceText}> {this.state.email} </Text>
            </Card>
          </View>

          <View style={localStyles.moneyContainer}>
            {this.renderVehicles()}
          </View>
          <View>
            <Card
              title={
                <View style={localStyles.activeVehicleContainer}>
                  <Text style={localStyles.activeVehicleTitleStyle}>
                    Active vehicle
                  </Text>
                  <Text style={localStyles.activeVehicleStyle}>
                    {this.state.activeVehiclePlate}
                  </Text>
                </View>
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
              <TouchableOpacity
                style={localStyles.saveActiveVehicleButton}
                onPress={() => this.saveActiveVehicle()}
              >
                <Text style={localStyles.btnText}>Save active vehicle</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPickerItem() {
    return this.state.vehicles.map((vehicle, key) => {
      return (
        <Picker.Item
          key={key}
          label={vehicle.licensePlate}
          value={vehicle.licensePlate}
        />
      );
    });
  }

  renderVehicles() {
    return (
      <Card title="Vehicles">
        <View>
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
        </View>
        <TouchableOpacity
          style={localStyles.addVehicleButton}
          onPress={() => this.props.navigation.navigate("AddVehicle")}
        >
          <Text style={localStyles.btnText}>Add vehicle</Text>
        </TouchableOpacity>
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
  saveActiveVehicleButton: {
    paddingVertical: 15,
    borderRadius: 25,
    margin: 15,
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
  activeVehicleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  activeVehicleTitleStyle: {
    fontSize: normalize(14),
    fontWeight: "bold",
    color: "#43484d",
    textAlign: "center",
    paddingBottom: 15
  },
  activeVehicleStyle: {
    fontSize: normalize(14),
    color: "#43484d",
    textAlign: "center",
    paddingBottom: 15
  }
});
