import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator
} from "react-native";
// import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
import DeviceInfo from "react-native-device-info";
import Modal from "react-native-modal";
import firebase from "react-native-firebase";
import { db } from "../Database/Database";
import theme from "../Styles/theme";

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: "Transactions"
  };
  constructor(props) {
    super(props);
    const uid = firebase.app().auth().currentUser.uid;
    // const uid = "0wvppHF0lDZbWgJEshp5UOqmJmu2";
    this.ref = db.collection("Users").doc(uid);
    this.unsubscribe = null;

    this.state = {
      gantrys: [],
      balance: 0,
      moneyInput: Number,
      showBalancePopUp: false,
      isUpdatingBalance: false,
      uid: uid
    };
  }

  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  //   this.setState({ balance: 319 });
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // onCollectionUpdate = doc => {
  //   const user = doc.data();

  //   this.setState({
  //     transactions: user.transactions,
  //     balance: user.balance,
  //     ready: true
  //   });
  // };

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <ScrollView>
          <View style={localStyles.moneyContainer}>
            {this.renderMoneyBalance()}
          </View>
          <View style={localStyles.addMoneyContainer}>
            {this.renderAddMoney()}
          </View>
          <View style={localStyles.gantrysContainer}>
            {this.renderPassedGantrys()}
          </View>
        </ScrollView>
      </View>
    );
  }

  async componentDidMount() {
    this.getMoneyBalance();
    let gantry1 = {
      name: "Gantry1",
      date: "2019-02-11",
      cost: 20,
      id: "0"
    };
    let gantry2 = {
      name: "Gantry2",
      date: "2019-02-11",
      cost: 38,
      id: "1"
    };
    let gantry3 = {
      name: "Gantry3",
      date: "2019-02-11",
      cost: 38,
      id: "2"
    };
    let gantry4 = {
      name: "Gantry4",
      date: "2019-02-11",
      cost: 38,
      id: "3"
    };
    let gantry5 = {
      name: "Gantry5",
      date: "2019-02-11",
      cost: 38,
      id: "4"
    };
    let gantry6 = {
      name: "Gantry6",
      date: "2019-02-11",
      cost: 38,
      id: "5"
    };
    let gantry7 = {
      name: "Gantry7",
      date: "2019-02-11",
      cost: 38,
      id: "6"
    };
    let gantry8 = {
      name: "Gantry8",
      date: "2019-02-11",
      cost: 38,
      id: "7"
    };
    let gantry9 = {
      name: "Gantry9",
      date: "2019-02-11",
      cost: 38,
      id: "8"
    };
    let gantry10 = {
      name: "Gantry10",
      date: "2019-02-17",
      cost: 38,
      id: "9"
    };
    let gantry11 = {
      name: "Gantry11",
      date: "2019-02-17",
      cost: 40,
      id: "10"
    };
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
  }

  getMoneyBalance = () => {
    const id = this.state.uid;
    const ref = db.collection("Users").doc(id);
    const getDoc = ref
      .get()
      .then(async doc => {
        if (doc.exists) {
          const data = await doc.data().balance;
          this.setState({ balance: data });
        }
        console.log("No such document");
        return;
      })
      .catch(err => {
        console.log("Error getting document: ", err);
      });
  };

  renderMoneyBalance() {
    return (
      <Card title="Balance">
        <View>
          <Text style={localStyles.balanceText}>
            {this.state.balance ? this.state.balance + " kr" : "0 kr"}
          </Text>
          {/* <TouchableOpacity
            style={localStyles.addMoneyButton}
            onPress={() => this.props.navigation.navigate("AddMoney")}
          >
            <Text style={localStyles.btnText}> Add money </Text>
          </TouchableOpacity> */}
        </View>
      </Card>
    );
  }

  // renderPassedGantrys() {
  //   const { transactions } = this.state;
  //   return (
  //     <Card title="Passed gantrys">
  //       {this.state.transactions.map((transaction, key) => {
  //         return (
  //           <View key={key}>
  //             <ListItem
  //               title={transaction.gantry}
  //               subtitle={transaction.date}
  //               rightSubtitle={"-" + transaction.cost + "kr"}
  //               subtitleStyle={{
  //                 color: "#707070"
  //               }}
  //             />
  //             <Divider />
  //           </View>
  //         );
  //       })}
  //     </Card>
  //   );
  // }

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
                subtitleStyle={{
                  color: "#707070"
                }}
              />
              <Divider />
            </View>
          );
        })}
      </Card>
    );
  }

  renderAddMoney() {
    return (
      <View>
        <Button
          title="Add money"
          style={localStyles.addMoneyButton}
          onPress={this.toggleAddMoneyPopup}
        />
        <Modal
          isVisible={this.state.showBalancePopUp}
          onBackdropPress={() => this.toggleAddMoneyPopup()}
          style={localStyles.modalPopup}
        >
          <Card title="Ammount">
            <View style={localStyles.addMoneyPopup}>
              <TextInput
                onChangeText={input =>
                  this.setState({
                    moneyInput: input
                  })
                }
                value={this.state.moneyInput}
                keyboardType="numeric"
                maxLength={10}
                autoFocus={true}
                placeholder="Ammount"
                style={localStyles.moneyTextInput}
              />
              <ActivityIndicator
                size="small"
                color={theme.PRIMARY_COLOR}
                animating={this.state.isUpdatingBalance}
              />
              <Button title="Add" onPress={this.updateMoneyBalance} />
            </View>
          </Card>
        </Modal>
      </View>
    );
  }

  toggleAddMoneyPopup = () => {
    this.setState({
      showBalancePopUp: !this.state.showBalancePopUp
    });
  };

  updateMoneyBalance = () => {
    this.setState({ isUpdatingBalance: true });
    const id = this.state.uid;
    const inc = firebase.firestore.FieldValue.increment(this.state.moneyInput);
    const ref = db.collection("Users").doc(id);
    const updateDoc = ref
      .update({ balance: inc })
      .then(() => {
        console.log("_application updated money balance");
        this.moneyBalanceUpdateComplete();
      })
      .catch(err => {
        console.log("_application Error updating balance: ", err);
      });
  };

  moneyBalanceUpdateComplete = () => {
    this.getMoneyBalance();
    this.setState({ isUpdatingBalance: false });
    this.toggleAddMoneyPopup();
    this.setState({ moneyInput: Number });
  };
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  moneyContainer: {},
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  gantrysContainer: {
    flex: 1,
    marginBottom: 10
  },
  addMoneyContainer: {},
  infoText: {
    fontSize: 15,
    margin: 10
  },
  balanceText: {
    fontSize: 30,
    textAlign: "center"
  },
  addMoneyButton: {
    marginTop: 15,
    width: 345,
    justifyContent: "center",
    marginHorizontal: 15
  },
  modalPopup: {
    alignItems: "center",
    marginBottom: 30
  },
  moneyTextInput: {
    backgroundColor: "#eee",
    height: 40,
    width: 280,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10
  }
});
