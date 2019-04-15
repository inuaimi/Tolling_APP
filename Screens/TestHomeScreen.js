import React, { Component } from 'react';  
import { Button, View, Text } from 'react-native';
import styles from '../Styles/styles'

export default class Home extends React.Component {  
  render() {
    return (
      <View>
        <Text style={styles.text}>Test Home Screen</Text>
        <Button
          title="Add"
          onPress={() => this.props.navigation.navigate('Add')}
        />
        <Button
          title="List"
          color="green"
          onPress={() => this.props.navigation.navigate('List')}
        />
      </View>
    );
  }
}