import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  Header, Card, ListItem, Divider, CheckBox, Button
} from "react-native-elements";
import styles from '../Styles/profileStyles'
import { db } from '../Database/Database';
import { MarkerAnimated } from 'react-native-maps';

export default class ProfileScreen extends React.Component {

  constructor() {
    super()
    this.ref = db.collection('Users').doc("XO5lwKAyI3PaEpGQ2bZ4");
    this.unsubscribe = null;

    this.state = {
      vehicles: [],
      loading: true,
      checked: false,
      checkedList: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (doc) => {
    //console.log("document: " + JSON.stringify(doc.data(), null, 2));
    const user = doc.data();

    //console.log("vehicles: " + JSON.stringify(vehicles, null, 2));
    
    this.setState({
      email: user.email,
      name: user.name,
      vehicles: user.vehicles
    })
  }

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <Header
          containerStyle={{ backgroundColor: '#ff7f50' }}
          centerComponent={{
            text: "Profile",
            style: { color: "#fff", fontSize: 26 }
          }}
        />
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
          <TouchableOpacity style={localStyles.addVehicleButton} onPress={() => this.props.navigation.navigate('AddVehicle')}>
            <Text style={localStyles.btnText}>Add vehicle</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  renderVehicles() {
    return (
      <Card title="Vehicles">
        {this.state.vehicles.map((vehicle, key) => {
          return (
            <View key={key}>
              <ListItem
                title={vehicle.regnumber}
                onPress={() => this.props.navigation.navigate('Vehicle', { 
                  regnumber: vehicle.regnumber,
                  type: vehicle.type
                })}
                chevron
              />
              <Divider />
            </View>
          )
        })}
      </Card>
    )
  }
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  gantrysContainer: {
    flex: 1,
    marginBottom: 10
  },
  moneyContainer: {
    // flex: 3
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  infoText: {
    fontSize: 15,
    margin: 10
  },
  moneyButton: {
    width: 350
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
    backgroundColor: '#ff7f50'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});