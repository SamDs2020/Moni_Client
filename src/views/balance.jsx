import React, { Component } from "react";
import { View, RefreshControl, Text } from "react-native";
import Banner from "../components/banner";
import { styles } from "../styles/balance.style";
import { ScrollView } from "react-native-gesture-handler";
import Transaction from "../components/transaction";
import { GetTokenInfo, $axios } from "../utilities/helper";

export default class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      refreshing: false,
      transactions: []
    };
  }

  componentWillMount() {
    GetTokenInfo()
      .then(async info => {
        console.log(info);
        const result = await this.updateData(info);
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  updateData(info) {
    return Promise.all([
      this.getTransactions(info),
      this.getBalance(info)
    ]).then(res => {
      console.log(res);
      return res.data;
    });
  }

  async getTransactions(info) {
    const axiosInstance = await $axios();
    return axiosInstance.get(`/transaction?userId=${info._id}`).then(res => {
      console.log(res.data);
      this.setState({
        ...this.state,
        transactions: res.data
      });
    });
  }

  async getBalance(info) {
    const axiosInstance = await $axios();
    return axiosInstance.get(`/user?id=${info.id}`).then(res => {
      console.log(res.data);
      this.setState({
        ...this.state,
        balance: res.data.gemPoints.currentGems
      });
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => this.setState({ refreshing: false }), 3000);
  }
  render() {
    return (
      <View style={styles.layout}>
        <Banner>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Balance</Text>
        </Banner>
        <View style={styles.balance}>
          <Text
            style={{ letterSpacing: 3, color: "#2F45B4", fontSize: 30 }}
            category="h4"
          >
            {`M${this.state.balance}`}
          </Text>
        </View>
        <View style={styles.transactions}>
          <View style={styles.transactionText}>
            <Text
              style={{
                color: "#2F45B4",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "500"
              }}
            >
              Transactions
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.handleRefresh()}
              ></RefreshControl>
            }
          >
            <Transaction color="green" />
            {/* {this.state.transactions.map((element, key) => (
                            <Transaction color="red" />
                        ))} */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
