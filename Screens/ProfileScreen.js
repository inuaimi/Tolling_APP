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

export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: "Profile"
  };

  constructor() {
    super()
    this.ref = db.collection('Users').doc("XO5lwKAyI3PaEpGQ2bZ4");
    this.unsubscribe = null;

    this.state = {
      vehicles: [],
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (doc) => {
    const user = doc.data();
    
    this.setState({
      email: user.email,
      name: user.name,
      vehicles: user.vehicles
    })
  }

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