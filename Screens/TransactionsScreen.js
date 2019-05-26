import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Card, ListItem, Divider } from "react-native-elements";
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
    this.ref = db.collection("Users").doc(uid);
    this.unsubscribe = null;

    this.state = {
      renderAll: false,
      gantrys: [],
      balance: 0,
      transactions: [],
      recentTransactions: [],
      ready: false,
      moneyInput: Number,
      showBalancePopUp: false,
      isUpdatingBalance: false,
      uid: uid
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
    });
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this._navListener.remove();
    this.unsubscribe();
  }

  onCollectionUpdate = doc => {
    const user = doc.data();
    if (
      user.transactions === undefined ||
      user.transactions.length === 0
    ) {
      return null;
    } else {
      let transactions = user.transactions.reverse(),
          recentTransactions = [];

      for(let i = 0; i < 10; i++) {
        recentTransactions.push(transactions[i]);
      }
    }

    this.setState({
      balance: user.balance,
      transactions: transactions,
      recentTransactions: recentTransactions,
      ready: true
    });
  };

  render() {
    return (
      <View style={localStyles.mainContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={localStyles.moneyContainer}>
            {this.renderMoneyBalance()}
          </View>
          <View style={localStyles.addMoneyContainer}>
            {this.renderAddMoney()}
          </View>
          <View style={localStyles.gantrysContainer}>
            { this.state.renderAll ?
              this.renderAllTransactions()
            : this.renderRecentTransactions() }
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
            {this.state.balance + " kr"}
          </Text>
        </View>
      </Card>
    );
  }

  renderRecentTransactions() {
    if (
      this.state.recentTransactions === undefined ||
      this.state.recentTransactions.length === 0
    ) {
      return null;
    }
    return (
      <Card title="Recent transactions">
        <View>
          {this.state.recentTransactions.map((x, key) => {
            return (
              <View key={key}>
                <ListItem
                  title={x.gantry}
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
        </View>
        <TouchableOpacity 
          style={localStyles.addMoneyButton}
          onPress={() => this.setState({ renderAll: true })}
        >
          <Text style={localStyles.addMoneyText}>
            Show all transactions
          </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  renderAllTransactions() {
    if (
      this.state.transactions === undefined ||
      this.state.transactions.length === 0
    ) {
      return null;
    }
    return (
      <Card title="All transactions">
        {this.state.transactions.map((x, key) => {
          return (
            <View key={key}>
              <ListItem
                title={x.gantry}
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
        <TouchableOpacity 
          style={localStyles.addMoneyButton}
          onPress={() => this.setState({ renderAll: false })}
        >
          <Text style={localStyles.addMoneyText}>
            Hide transactions
          </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  renderAddMoney() {
    return (
      <View>
        <TouchableOpacity
          style={localStyles.addMoneyButton}
          onPress={this.toggleAddMoneyPopup}
        >
          <Text style={localStyles.addMoneyText}>Add money</Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.showBalancePopUp}
          onBackdropPress={() => this.toggleAddMoneyPopup()}
          keyboardShouldPersistTaps="always"
          style={localStyles.modalPopup}
        >
          <Card title="Amount">
            <View style={localStyles.addMoneyPopup}>
              <TextInput
                onChangeText={input =>
                  this.setState({
                    moneyInput: Number(input)
                  })
                }
                keyboardType="numeric"
                maxLength={10}
                autoFocus={true}
                placeholder="Amount"
                style={localStyles.moneyTextInput}
              />
              <ActivityIndicator
                size="small"
                color={theme.PRIMARY_COLOR}
                animating={this.state.isUpdatingBalance}
              />
              <TouchableOpacity
                style={localStyles.addMoneyButton}
                onPress={this.updateMoneyBalance}
              >
                <Text style={localStyles.addMoneyText}>Add</Text>
              </TouchableOpacity>
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
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: theme.ACCENT_COLOR
  },
  addMoneyText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold"
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
