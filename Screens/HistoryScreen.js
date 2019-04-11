import React from "react";
import { Text, View, StyleSheet } from "react-native";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/styles";
import { Header, Button } from "react-native-elements";

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "History"
  };
  constructor(props) {
    super(props);
    this.state = {
      gantrys: [],
      blance: Number
    };
  }
  render() {
    return (
      <View style={localStyles.mainContainer}>
        <Header
          centerComponent={{
            text: "History",
            style: { color: "#fff", fontSize: 26 }
          }}
        />
        <View style={localStyles.gantrysContainer}>
          <Text style={localStyles.headerText}>{"Passed Gantrys: "}</Text>
          {this.renderPassedGantrys()}
        </View>
        <View style={localStyles.moneyContainer}>
          {this.renderMoneySpent()}
          <Button
            style={localStyles.moneyButton}
            title="ADD MONEYEYEYEY"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    let gantry1 = { name: "Gantry1", date: "24/7", cost: 20, id: 0 };
    let gantry2 = { name: "Gantry2", date: "21/4", cost: 38, id: 1 };
    this.setState({ gantrys: [gantry1, gantry2] });
  }

  renderMoneyBalance() {
    return (
      <View>
        <Text style={localStyles.headerText}>Balance</Text>
        <Text style={localStyles.infoText}>{this.state.blance + "kr"}</Text>
      </View>
    );
  }

  renderPassedGantrys() {
    console.log("gantrys:", this.state.gantrys);
    return this.state.gantrys.map(x => {
      return (
        <View key={x.id}>
          <Text style={localStyles.infoText}>{x.date + " " + x.name}</Text>
        </View>
      );
    });
  }

  calculateMoneySpent() {
    let totalMoneySpent = 0;
    this.state.gantrys.forEach(x => {
      totalMoneySpent += x.cost;
    });

    return totalMoneySpent;
  }

  renderMoneySpent() {
    return (
      <View>
        <Text style={localStyles.headerText}>Money spent: </Text>
        <Text style={localStyles.infoText}>
          {this.calculateMoneySpent() + "kr"}
        </Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  gantrysContainer: {
    flex: 9
  },
  moneyContainer: {
    flex: 3
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  infoText: {
    fontSize: 20,
    margin: 10
  },
  moneyButton: {
    width: 350
  }
});
