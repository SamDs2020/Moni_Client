import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import {
  $axios,
  StoreToken,
  GetTokenInfo,
  VerifyLoginStatus,
  CheckFirstTimer,
  ResetFirstTimerFlag
} from "../utilities/helper";
import Modal from "react-native-modal";
import { sharedStyles } from "../styles/shared.style";
import ScrollableAvoidKeyboardComponent from "../components/scrollableAvoidKeyboard.component";
import { Text, Popover, Button, Input } from "react-native-ui-kitten";
import LottieView from "lottie-react-native";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        phoneNumber: "09052814862",
        password: "12345678"
      },
      showLoadingModal: false,
      secureTextEntry: true,
      loginMessage: ""
    };
  }

  componentDidUpdate() {
    if (this.state.showLoadingModal) this.animation.play();
  }

  componentWillMount() {
    /* Todo: Do this in a switch naviagtor */
    VerifyLoginStatus().then(flag => {
      if (flag) this.props.navigation.navigate("Home");
    });
  }

  async authenticteWithHardware() {
    if (
      (await LocalAuthentication.hasHardwareAsync()) &&
      LocalAuthentication.isEnrolledAsync()
    ) {
      const options = {
        promptMessage: "Confirm identity to continue",
        fallbackLabel: "Enter passcode instead"
      };
      const auth = await LocalAuthentication.authenticateAsync(options);
      if (!auth.success) {
        this.showErrorAlert("Unable to confirm identity");
        return;
      }
      this.setState({ showLoadingModal: true });
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 2000);
    }
  }

  showErrorAlert(message) {
    Alert.alert("Error", message, [{ text: "OK", onPress: () => {} }], {
      cancelable: false
    });
  }
  async handleLogin() {
    // @ts-ignore
    this.setState({
      ...this.state,
      editable: false,
      disabled: true,
      visible: false
    });
    if (
      this.state.credentials.phoneNumber.trim() === "" ||
      this.state.credentials.password.trim() === ""
    ) {
      return this.showErrorAlert("Username and password required");
    }

    this.setState({ showLoadingModal: true });

    const axiosInstance = await $axios();
    axiosInstance
      .post("/user/login", this.state.credentials)
      .then(res => {
        if (!res.data.token) throw new Error("Please try again");
        this.setState({ showLoadingModal: false });
        StoreToken(res.data.token).then(_ => {
          setTimeout(async () => {
            console.log("In here!");
            if (await CheckFirstTimer()) this.props.navigation.push("survey");
            else this.props.navigation.push("home");
          }, 1000);
        });
      })
      .catch(error => {
        let message =
          error.message === "Network Error"
            ? "Unable to connect to server"
            : error.response.data.error;

        setTimeout(() => {
          this.setState({ showLoadingModal: false });

          setTimeout(() => {
            this.showErrorAlert(message);
          }, 500);
        }, 1000);
      });
  }

  togglePopup() {
    this.setState({ visible: !this.state.visible });
  }

  renderIcon = style => {
    return (
      <TouchableOpacity
        style={{ width: 40, alignItems: "center", justifyContent: "center" }}
        onPress={() =>
          this.setState({ secureTextEntry: !this.state.secureTextEntry })
        }
      >
        <Text style={{ fontWeight: "300" }} category="label">
          {this.state.secureTextEntry ? "SHOW" : "HIDE"}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    // @ts-ignore
    return (
      <ScrollableAvoidKeyboardComponent>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={sharedStyles.rootContainer}>
          {/* <LoginCarousel /> */}
          <View
            style={{
              flexGrow: 1,
              alignItems: "center",
              marginHorizontal: 30,
              marginBottom: 60,
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: "80%",
                height: 80,
                marginBottom: 50
              }}
              source={require("../../assets/lm1.png")}
            ></Image>
            <Input
              value={this.state.credentials.phoneNumber}
              style={styles.input}
              onChangeText={text =>
                this.setState({
                  credentials: { ...this.state.credentials, phoneNumber: text }
                })
              }
              placeholder="phone number"
            ></Input>
            <Input
              value={this.state.credentials.password}
              style={styles.input}
              secureTextEntry={this.state.secureTextEntry}
              placeholder="Password"
              icon={() => this.renderIcon()}
              onChangeText={text =>
                this.setState({
                  credentials: { ...this.state.credentials, password: text }
                })
              }
              placeholder="Password"
            ></Input>
            <View
              style={{
                alignSelf: "stretch",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                onPress={async () => await this.authenticteWithHardware()}
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  marginVertical: 10,
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    height: 25,
                    width: 25,
                    marginRight: 10
                  }}
                  source={require("../../assets/icons/fingerprint.png")}
                ></Image>
                <Text style={{ color: "#7f8c8d" }}>Use TouchID</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("registration")}
              >
                <Text>Register</Text>
              </TouchableOpacity>
            </View>

            <Button
              style={styles.button}
              size="large"
              onPress={() => this.handleLogin()}
            >
              Sign in
            </Button>
          </View>
        </View>
        <Modal
          isVisible={this.state.showLoadingModal}
          style={{
            padding: 0,
            margin: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 250,
              height: 250
            }}
            source={require("../../assets/lottie/cube-loader.json")}
          />
        </Modal>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const styles = {
  input: {
    marginBottom: 10
  },

  button: {
    width: "100%",
    marginVertical: 10,
    borderColor: "#fff",
    paddingVertical: 20,
    backgroundColor: "#262D60"
  }
};
