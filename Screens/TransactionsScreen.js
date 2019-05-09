import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
          <TouchableOpacity style={localStyles.addMoneyButton} onPress={() => this.props.navigation.navigate('AddMoney')} >
              <Text style={localStyles.btnText}> Add money </Text>
            </TouchableOpacity>
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
  },
  addMoneyButton: {
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#2ecc71'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
