import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
//      Imports: "css-alike-ish" styling
import styles from "../Styles/styles";
import { Header, Button, Card, ListItem, List } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "History"
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
        <Header
          centerComponent={{
            text: "History",
            style: { color: "#fff", fontSize: 26 }
          }}
        />
        <View style={localStyles.moneyContainer}>
          {this.renderMoneyBalance()}
        </View>

        <View style={localStyles.gantrysContainer}>
          {/* <Text style={localStyles.headerText}>{"Passed Gantrys: "}</Text> */}
          {this.renderPassedGantrys()}
        </View>
      </View>
    );
  }

  componentDidMount() {
    let gantry1 = { name: "Gantry1", date: "24/7", cost: 20, id: 0 };
    let gantry2 = { name: "Gantry2", date: "21/4", cost: 38, id: 1 };
    let gantry3 = { name: "Gantry3", date: "21/4", cost: 38, id: 2 };
    let gantry4 = { name: "Gantry4", date: "21/4", cost: 38, id: 3 };
    let gantry5 = { name: "Gantry5", date: "21/4", cost: 38, id: 4 };
    let gantry6 = { name: "Gantry6", date: "21/4", cost: 38, id: 5 };
    let gantry7 = { name: "Gantry7", date: "21/4", cost: 38, id: 6 };
    let gantry8 = { name: "Gantry8", date: "21/4", cost: 38, id: 7 };
    let gantry9 = { name: "Gantry9", date: "21/4", cost: 38, id: 8 };
    let gantry10 = { name: "Gantry10", date: "21/4", cost: 38, id: 9 };
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
        gantry10
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

  // renderPassedGantrys() {
  //   console.log("gantrys:", this.state.gantrys);
  //   return (
  //     <Card title="wiee">
  //       {this.state.gantrys.map(x => {
  //         return (
  //           <View key={x.id}>
  //             <Text style={localStyles.infoText}>{x.date + " " + x.name}</Text>
  //           </View>
  //         );
  //       })}
  //     </Card>
  //   );
  // }

  renderPassedGantrys() {
    console.log("gantrys:", this.state.gantrys);
    //Id fungerar inte riktigt som det ska
    //Listan är för lång
    return (
      <Card title="Passed gantrys">
        {
          <FlatList
            data={this.state.gantrys}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem title={item.name} id={item.id} />
            )}
          />
        }
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
  },
  balanceText: {
    fontSize: 30,
    textAlign: "center"
  }
});
