import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const Inputs = ({ value, onChangeText, placeholder, placeholderTextColor, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                autoCorrect={false}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      width: '100%',
      borderColor: '#000',
      backgroundColor: '#000',
      borderWidth: 2,
      borderRadius: 50
    },
    input: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 10,
      paddingTop: 10,
      color: '#fff',
      fontSize: 18,
      fontWeight: '400',
      width: '100%'
    }
  });
  
  export { Inputs };