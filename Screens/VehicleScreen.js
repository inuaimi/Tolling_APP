import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {
  Header, Card, ListItem, Divider
} from "react-native-elements";                       
import styles from '../Styles/profileStyles'

export default class VehicleScreen extends React.Component {

  static navigationOptions = {
    title: "Vehicle Info",
    headerVisible: true,
  };

  constructor() {
    super()

    this.state = {
      vehice: null,
      ready: false
    }
  }

  render() {

    const vehicle = this.props.navigation.state.params;
    console.log("vehicle: " + JSON.stringify(vehicle, null, 2));

    return (
      <View style={localStyles.mainContainer}>
        <View>
          <Card title={vehicle.regnumber}>
            <Text style={localStyles.typeText}>{ vehicle.type }</Text>
          </Card>
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
  typeText: {
    fontSize: 14,
    textAlign: "center"
  }
});

