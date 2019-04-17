import React from 'react';
import {
  Text, View
} from 'react-native';
 //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'History'
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HistoryScreen</Text>
      </View>
    );
  }
}