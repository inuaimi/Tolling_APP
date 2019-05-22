import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator
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
      gantrys: [],
      balance: 0,
      transactions: [],
      ready: false,
      moneyInput: Number,
      showBalancePopUp: false,
      isUpdatingBalance: false,
      uid: uid
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = doc => {
    const user = doc.data();

    this.setState({
      balance: user.balance,
      transactions: user.transactions,
      ready: true
    });
  };

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
            {this.renderRecentTransactions()}
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
    console.log("gantrys:", this.state.gantrys);
    if (
      this.state.transactions === undefined ||
      this.state.transactions.length === 0
    ) {
      return null;
    }
    return (
      <Card title="Recent transactions">
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
                value={String(this.state.moneyInput)}
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
