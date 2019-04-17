import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontWeight: '400',
    fontSize: 18,
  }
});

export { Button };