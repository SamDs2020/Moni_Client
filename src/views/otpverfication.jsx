import React from "react";
import { View, Image, StatusBar } from "react-native";
import {
  Card,
  Button,
  TextInput,
  Snackbar,
  ActivityIndicator,
  Colors
} from "react-native-paper";
import { styles } from "../styles/otpverification.style";
import { styles as lStyles } from "../styles/login.style";
import { lm_ICON } from "../../assets/lm.logo";
import { $axios } from "../utilities/helper";

export default class OtpVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode: [],
      visible: false,
      snackbarMessage: "",
      verifying: false,
      inputDisabled: false,
      error: false
    };
  }

  handleInputChange(ref, text, nextRef) {
    if (text.trim() === "") return;
    // @ts-ignore
    const obj = { ...this.state };
    obj.otpCode[ref] = text;
    this.setState({ ...this.state, obj });
    this.changeFocus(nextRef);
  }
  changeFocus(nextRef) {
    if (nextRef.trim() === "") return;
    // @ts-ignore
    this.refs[nextRef].focus();
  }

  async handleVerify() {
    //@ts-ignore
    this.setState({ error: false, inputDisabled: true, verifying: true });
    const otpCode = this.state.otpCode.join("");

    if (otpCode.length < 5) {
      this.setState({
        visible: true,
        snackbarMessage: "Please input the otp code sent!!"
      });
      return;
    }
    const userId = this.props.navigation.getParam("userId");

    const axiosInstance = await $axios();
    axiosInstance
      .post("/user/verify", { userId, otpCode })
      .then(async res => {
        if (!res.data) throw "Pls try verifying in a few minutes";

        this.setState({
          visible: true,
          snackbarMessage: res.data.message,
          inputDisabled: false,
          verifying: false,
          error: false
        });

        await setTimeout(() => {
          this.props.navigation.push("login");
        }, 2000);
      })
      .catch(error => {
        this.setState({
          visible: true,
          snackbarMessage: `${error.response.data.error}`,
          inputDisabled: false,
          verifying: false,
          error: true
        });
      });
  }

  render() {
    const textInputs = [
      { ref: "1", nextRef: "2" },
      { ref: "2", nextRef: "3" },
      { ref: "3", nextRef: "4" },
      { ref: "4", nextRef: "5" },
      { ref: "5", nextRef: "" }
    ];
    const backgroundColor = this.state.error ? "red" : "green";

    return (
      <>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <Card elevation={0}>
            <Card.Title
              title=""
              left={_ => (
                <Image style={styles.logo} source={{ uri: lm_ICON }}></Image>
              )}
            />
            <Card.Title
              title="Otp Verfication"
              subtitle="Please enter the otp code sent to your device"
            ></Card.Title>
            <Card.Content>
              <View style={styles.inputsContainer}>
                {textInputs.map((obj, key) => (
                  <TextInput
                    disabled={this.state.inputDisabled}
                    key={key}
                    keyboardType="numeric"
                    returnKeyType="next"
                    ref={obj.ref}
                    onChangeText={text => {
                      this.handleInputChange(obj.ref, text, obj.nextRef);
                    }}
                    maxLength={1}
                    style={styles.textInputs}
                    mode="flat"
                  ></TextInput>
                ))}
              </View>
            </Card.Content>
            <Card.Actions>
              {this.state.verifying ? (
                <ActivityIndicator
                  style={styles.btn}
                  size="large"
                  animating={true}
                  color={Colors.blue900}
                />
              ) : (
                <Button
                  onPress={async () => await this.handleVerify()}
                  style={lStyles.btn}
                  mode="contained"
                >
                  Verify
                </Button>
              )}
            </Card.Actions>
          </Card>
          <Snackbar
            style={{ backgroundColor }}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            duration={5000}
          >
            {this.state.snackbarMessage}
          </Snackbar>
        </View>
      </>
    );
  }
}
