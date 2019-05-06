import React from "react";
import { Text, View, StyleSheet } from "react-native";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/styles";
import { Header, Card, ListItem, Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import DeviceInfo from "react-native-device-info";

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "Transactions"
  };
  constructor(props) {
    super(props);
    this.state = {
      gantrys: [],
      balance: Number
    };
  }

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <ScrollView>
          <View style={localStyles.moneyContainer}>
            {this.renderMoneyBalance()}
          </View>

          <View style={localStyles.gantrysContainer}>
            {this.renderPassedGantrys()}
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    DeviceInfo.getMACAddress().then(val => {
      console.log("MacAdress: " + val);
    });
    let gantry1 = { name: "Gantry1", date: "2019-02-11", cost: 20, id: "0" };
    let gantry2 = { name: "Gantry2", date: "2019-02-11", cost: 38, id: "1" };
    let gantry3 = { name: "Gantry3", date: "2019-02-11", cost: 38, id: "2" };
    let gantry4 = { name: "Gantry4", date: "2019-02-11", cost: 38, id: "3" };
    let gantry5 = { name: "Gantry5", date: "2019-02-11", cost: 38, id: "4" };
    let gantry6 = { name: "Gantry6", date: "2019-02-11", cost: 38, id: "5" };
    let gantry7 = { name: "Gantry7", date: "2019-02-11", cost: 38, id: "6" };
    let gantry8 = { name: "Gantry8", date: "2019-02-11", cost: 38, id: "7" };
    let gantry9 = { name: "Gantry9", date: "2019-02-11", cost: 38, id: "8" };
    let gantry10 = { name: "Gantry10", date: "2019-02-17", cost: 38, id: "9" };
    let gantry11 = { name: "Gantry11", date: "2019-02-17", cost: 40, id: "10" };
    this.setState({
      gantrys: [
        gantry1,
        gantry2,
        gantry3,
        gantry4,
        gantry5,
        gantry6,
        gantry7,
        gantry8,
        gantry9,
        gantry10,
        gantry11
      ]
    });
    this.setState({ balance: 319 });
  }

  renderMoneyBalance() {
    return (
      <Card title="Balance">
        <View>
          <Text style={localStyles.balanceText}>
            {this.state.balance + "kr"}
          </Text>
        </View>
      </Card>
    );
  }

  renderPassedGantrys() {
    console.log("gantrys:", this.state.gantrys);
    return (
      <Card title="Passed gantrys">
        {this.state.gantrys.map(x => {
          return (
            <View key={x.id}>
              <ListItem
                title={x.name}
                subtitle={x.date}
                rightSubtitle={"-" + x.cost + "kr"}
                subtitleStyle={{ color: "#707070" }}
              />
              <Divider />
            </View>
          );
        })}
      </Card>
    );
  }

  //Not used atm
  calculateMoneySpent() {
    let totalMoneySpent = 0;
    this.state.gantrys.forEach(x => {
      totalMoneySpent += x.cost;
    });

    return totalMoneySpent;
  }

  //Not used atm
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
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  gantrysContainer: {
    flex: 1,
    marginBottom: 10
  },
  moneyContainer: {
    // flex: 3
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  infoText: {
    fontSize: 15,
    margin: 10
  },
  moneyButton: {
    width: 350
  },
  balanceText: {
    fontSize: 30,
    textAlign: "center"
  }
});
