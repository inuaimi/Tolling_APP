import React from 'react';
import {
  Text, View
} from 'react-native';
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <Text style={styles.text}>MapScreen</Text>
        </View>
        <View style={styles.bottomDetailsContainer}>
          <View style={styles.bottomDetailsKeys}>
            <Text style={styles.bottomDetailsKeyText}>Name of gantry</Text>
            <Text style={styles.bottomDetailsKeyText}>Distance to gantry</Text>
          </View>
          <View style={styles.bottomDetailsValues}>
          <Text style={styles.bottomDetailsText}>Öresund</Text>
          <Text style={styles.bottomDetailsText}>10km</Text>
          
          </View>
        </View>
      </View>
    );
  }
}