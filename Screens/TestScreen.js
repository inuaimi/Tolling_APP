import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/styles";
import {
  Header,
  Card,
  ListItem,
  Divider,
  Icon,
  Button
} from "react-native-elements";
import Modal from "react-native-modal";
import firebase from "react-native-firebase";
import { regiesterTransactionToGantry } from "../Database/Database";
import theme from "../Styles/theme";

export default class TestScreen extends React.Component {
  static navigationOptions = {
    title: "Test"
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={{ marginTop: 60, height: 30 }}
          onPress={this.testRegTransToGantry}
        >
          Testis
        </Button>
      </View>
    );
  }

  testRegTransToGantry = () => {
    const gantryId = "E9fzVvCmBQA78KU1oVKx";
    const userId = "C0HWUTEeTrR3YLoyaVmd1Wv0Vwo2";

    regiesterTransactionToGantry(gantryId, userId);
  };
}
