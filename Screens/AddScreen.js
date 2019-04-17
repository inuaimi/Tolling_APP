import React from 'react';
import {
  Text, View, Button, TextInput, TouchableHighlight, AlertIOS
} from 'react-native';
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'
import { addItem } from '../Database/Database';


export default class AddScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.nativeEvent.text
    });
  }
  handleSubmit() {
    addItem(this.state.name);
    alert('Item saved successfully');
  }

  static navigationOptions = {
    title: 'Test'
  };

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>Add item</Text>
        <TextInput
          style={styles.itemInput}
          placeholder={'Add item'}
          onChange={this.handleChange}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='white'
          onPress={this.handleSubmit}
        >
          <Text
            style={styles.buttonText}>
            Add
            </Text>
        </TouchableHighlight>
        
      </View>
    );
  }
}