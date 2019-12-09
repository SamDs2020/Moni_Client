import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "../styles/survey.style";
import { Layout } from "react-native-ui-kitten";
import DynamicStatusBarComponent from "../components/dynamicStatusBar.component";
import Option from "../components/option";

export default class Survey extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      progress1: false,
      progress2: false,
      progress3: false
    };
  }

  addToSelection(value) {
    const obj = { ...this.state };
    obj.selection.push(value);
    this.setState(obj);

    if (this.state.selection.length >= 3) {
      console.log("Nav out");
    }
  }

  updateProgress(value) {
    console.log("length ", this.state.selection.length);
    if (this.state.selection.length === 1) {
      this.setState({ progress1: value });
      console.log("Progress ", this.state.progress1);
    } else if (this.state.selection.length === 2) {
      this.setState({ progress2: value });
    } else if (this.state.selection.length === 3) {
      this.setState({ progress3: value });
    }
  }

  handleSelected(value, no) {
    console.log("Inside");
    const index = this.state.selection.indexOf(value);

    if (index !== -1) {
      console.log("removing!");
      const obj = { ...this.state };
      obj.selection.splice(index, 1);
      this.setState(obj);
      this.updateProgress(false);
    } else {
      console.log("Adding");
      this.addToSelection(value);
      this.updateProgress(true);
    }
    if (this.state.selection.length === 3) {
      setTimeout(() => {
        console.log("Navigating");
        this.props.navigation.navigate("welcome", {
          preferences: this.state.selection
        });
        return;
      }, 200);
    }
  }
  render() {
    const increaseProgress1 = this.state.progress1 ? "#2B41AF" : null;
    const increaseProgress2 = this.state.progress2 ? "#2B41AF" : null;
    const increaseProgress3 = this.state.progress3 ? "#2B41AF" : null;
    return (
      <>
        <StatusBar barStyle="dark-content"></StatusBar>
        <Layout style={styles.layout}>
          <View style={styles.header}>
            <Text style={{ fontSize: 30 }}>Welcome!</Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Choose your hobbies
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "300", marginTop: 20 }}>
              3 choices only
            </Text>
          </View>
          <View style={styles.header2}>
            <View style={styles.progress}>
              <View
                style={{
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    this.state.selection.length === 1 ||
                    this.state.selection.length > 1
                      ? "#2B41AF"
                      : null
                }}
              >
                {this.state.selection.length === 1 ? (
                  <Text style={{ textAlign: "center", fontSize: 18 }}>1</Text>
                ) : null}
              </View>
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    this.state.selection.length === 2 ||
                    this.state.selection.length > 2
                      ? "#2B41AF"
                      : null
                }}
              >
                {this.state.selection.length === 2 ? (
                  <Text style={{ textAlign: "center", fontSize: 18 }}>2</Text>
                ) : null}
                {this.state.selection.length === 3 ? (
                  <Text style={{ textAlign: "center", fontSize: 18 }}>
                    Thank You!
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  flexGrow: 1,
                  backgroundColor:
                    this.state.selection.length === 3 ? "#2B41AF" : null
                }}
              ></View>
            </View>
          </View>
          <View style={styles.header3}>
            <TouchableOpacity onPress={() => this.handleSelected("Movies", 1)}>
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Movies") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Movies") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Movies
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleSelected("Restaurant", 2)}
            >
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Restaurant") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Restaurant") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Restaurant
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleSelected("Nightlife", 3)}
            >
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Nightlife") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Nightlife") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Nightlife
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleSelected("Shopping", 4)}
            >
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Shopping") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Shopping") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Shopping
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSelected("Leisure", 5)}>
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Leisure") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Leisure") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Leisure
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSelected("Hotels", 6)}>
              <View
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      this.state.selection.indexOf("Hotels") !== -1
                        ? "#2B41AF"
                        : "#EBEDF7"
                  }
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      this.state.selection.indexOf("Hotels") !== -1
                        ? "white"
                        : "black"
                  }}
                >
                  Hotels
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Layout>
      </>
    );
  }
}
