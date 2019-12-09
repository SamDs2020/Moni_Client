import React from "react";
import {
  Layout,
  TopNavigation,
  Avatar,
  Text,
  Button
} from "react-native-ui-kitten";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GetTokenInfo, $axios, DeleteToken } from "../utilities/helper";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20
  }
};
export default class Profile extends React.Component {
  state = {
    isModalVisible: false
  };
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      loggingOut: false
    };
  }

  componentWillMount() {
    GetTokenInfo()
      .then(async info => {
        const axiosInstance = await $axios();
        axiosInstance
          .get(`/user?id=${info.id}`)
          .then(res => {
            this.setState({ ...this.state, profile: { ...res.data } });
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => console.log(error));
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  render() {
    return (
      <>
        {this.state.profile ? (
          <>
            <TopNavigation
              alignment="center"
              title="Profile"
              titleStyle={{ fontSize: 20 }}
            />
            <Layout style={styles.container}>
              <Layout style={{ flex: 1, padding: 20 }}>
                <Layout style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={this.toggleModal}>
                    <Avatar
                      size="giant"
                      source={require("../../assets/icons/boy.png")}
                    />
                  </TouchableOpacity>
                  <Layout style={{ marginLeft: 20 }}>
                    <Text style={{ color: "#2d3436" }} category="h4">
                      {this.state.profile.name}
                    </Text>
                    <Layout style={{ flexDirection: "row" }}>
                      <Text category="s1">Gems:</Text>
                      <Text
                        style={{ marginLeft: 5, color: "#2ecc71" }}
                        category="s1"
                      >
                        {this.state.profile.gemPoints.currentGems}
                      </Text>
                    </Layout>

                    <Layout style={{ height: 200 }}></Layout>
                  </Layout>
                </Layout>
              </Layout>
              <Button
                disabled={this.state.loggingOut}
                onPress={async _ => {
                  this.setState({ loggingOut: true });
                  await DeleteToken();
                  this.setState({ loggingOut: false });
                  this.props.navigation.navigate("login");
                }}
                appearance="filled"
                status="danger"
                size="large"
              >
                logout
              </Button>
            </Layout>
          </>
        ) : null}
      </>
    );
  }
}
