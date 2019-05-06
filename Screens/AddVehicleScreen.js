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
import { addUserVehicle } from '../Database/Database';

export default class AddVehicleScreen extends React.Component {

  static navigationOptions = {
    title: "Add Vehicle",
    headerVisible: true,
  };

  constructor() {
    super()

    this.state = {
      ready: false,
      disabled: true
    }
  }

  // componentDidMount = () => {
  //   const vehicle = this.props.navigation.state.params;
  //   console.log("vehicle: " + JSON.stringify(vehicle, null, 2));
  //   this.setState({ 
  //     vehicle: vehicle,
  //     regnumber: vehicle.regnumber,
  //     type: vehicle.type 
  //   });
  //   this.state.ready = true;
  // }

  addUserVehicle = () => {
    const { regnumber, type } = this.state;
    addUserVehicle(regnumber, type);
    this.props.navigation.goBack();
  }

  

  render() {

    // if(!this.state.ready) {
    //   return null;
    // }
    // const { vehicle, regnumber, type } = this.state;

    return (
      <View style={localStyles.mainContainer}>
        <View>
          <Card title="Regnumber">
            <TextInput 
              placeholder="ABC123" 
              style={localStyles.text} 
              onChangeText={(text) => this.setState({ regnumber: text})}>
            </TextInput>
          </Card>
          <Card title="Type">
            <View>
              <Picker
                selectedValue={this.state.type}
                
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({type: itemValue})
              }>
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Truck" value="Truck" />
                <Picker.Item label="Bus" value="Bus" />
                <Picker.Item label="Motorcycle" value="Motorcycle" />
              </Picker>
            </View>
          </Card>
          <TouchableOpacity style={localStyles.addButton} onPress={() => this.addUserVehicle()}>
            <Text style={localStyles.btnText}> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // deleteVehicle = (vehicle) => {
  //   deleteUserVehicle(vehicle);
  //   this.props.navigation.goBack();
  // }

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
    backgroundColor: '#ff7f50'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});

