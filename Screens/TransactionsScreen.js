import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/styles";
import { Header, Card, ListItem, Divider } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { db } from '../Database/Database';

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "Transactions"
  };
  constructor(props) {
    super(props);
    this.ref = db.collection('Users').doc('XO5lwKAyI3PaEpGQ2bZ4');
    this.unsubscribe = null;

    this.state = {
      gantrys: [],
      balance: Number,
      ready: false
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // DeviceInfo.getMACAddress().then(val => {
    //   console.log("MacAdress: " + val);
    // });
    // let gantry1 = { name: "Gantry1", date: "2019-02-11", cost: 20, id: "0" };
    // let gantry2 = { name: "Gantry2", date: "2019-02-11", cost: 38, id: "1" };
    // let gantry3 = { name: "Gantry3", date: "2019-02-11", cost: 38, id: "2" };
    // let gantry4 = { name: "Gantry4", date: "2019-02-11", cost: 38, id: "3" };
    // let gantry5 = { name: "Gantry5", date: "2019-02-11", cost: 38, id: "4" };
    // let gantry6 = { name: "Gantry6", date: "2019-02-11", cost: 38, id: "5" };
    // let gantry7 = { name: "Gantry7", date: "2019-02-11", cost: 38, id: "6" };
    // let gantry8 = { name: "Gantry8", date: "2019-02-11", cost: 38, id: "7" };
    // let gantry9 = { name: "Gantry9", date: "2019-02-11", cost: 38, id: "8" };
    // let gantry10 = { name: "Gantry10", date: "2019-02-17", cost: 38, id: "9" };
    // let gantry11 = { name: "Gantry11", date: "2019-02-17", cost: 40, id: "10" };
    // this.setState({
    //   gantrys: [
    //     gantry1,
    //     gantry2,
    //     gantry3,
    //     gantry4,
    //     gantry5,
    //     gantry6,
    //     gantry7,
    //     gantry8,
    //     gantry9,
    //     gantry10,
    //     gantry11
    //   ]
    // });
    this.setState({ balance: 319 });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (doc) => {
    const user = doc.data();

    this.setState({
      transactions: user.transactions,
      ready: true
    });
  }

  render() {
    if(!this.state.ready) {
      return null;
    }
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
    const { transactions } = this.state;
    return (
      <Card title="Passed gantrys">
        {this.state.transactions.map((transaction, key) => {
          return (
            <View key={key}>
              <ListItem
                title={transaction.gantry}
                subtitle={transaction.date}
                rightSubtitle={"-" + transaction.cost + "kr"}
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
    const { transactions } = this.state;
    transactions.forEach(x => {
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
