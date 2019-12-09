import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Layout } from "react-native-ui-kitten";
import Banner from "../components/banner";
import QRCode from "react-native-qrcode-svg";
import { styles } from "../styles/qrcode.style";
import { sharedStyles } from "../styles/shared.style";
import { GetTokenInfo, $axios, SaveFirstTimer } from "../utilities/helper";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            user: ""
        };
    }

    componentWillMount() {
        GetTokenInfo()
            .then(info => this.setState({ value: info.id, user: info.name }))
            .catch(console.error);
    }

    async handlePreferenceSetup() {
        //save prefrences to db first
        const axiosInstance = await $axios();
        const preferences = this.props.navigation.getParam("preferences");
        axiosInstance
            .post("/user/pref", { preferences, userId: this.state.value })
            .then(async res => {
                if (res.data.message === "success") {
                    if (await SaveFirstTimer()) {
                        this.props.navigation.navigate("home");
                        return;
                    } else console.log("An error ocurred while saving variable!!");
                }
                throw "An error ocurred pls contact your admin";
            })
            .catch(error => {
                console.log(error);
                if (error.message === "Network Error") {
                    console.log("Server is down!");
                    return;
                }
                console.log(error.response.data.error);
            });
    }
    render() {
        return (
            <Layout style={styles.layout}>
                <Banner>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ fontSize: 18, paddingRight: 10 }}>Your QR Code is Ready</Text>
                        <Image
                            style={{ resizeMode: "contain", width: 20, height: 20 }}
                            source={require("../../assets/icons/correct.png")}
                        />
                    </View>
                </Banner>
                <View style={styles.qr}>
                    <QRCode
                        value={this.state.value.trim() !== "" ? this.state.value : "NA"}
                        size={200}
                        color="black"
                        backgroundColor="white"
                    ></QRCode>
                </View>
                <View style={{ width: "70%", marginTop: 30 }}>
                    <Text
                        style={{
                            padding: 10,
                            textAlign: "center",
                            color: "#2B41AF",
                            fontSize: 20,
                            fontWeight: "600"
                        }}
                    >
                        Hooray!!
                    </Text>
                    <Text style={{ textAlign: "center", color: "#2B41AF", fontSize: 15 }}>
                        Landmark Citizen ID created successfully!
                    </Text>

                    <View style={[sharedStyles.rowAlign, { marginTop: 30 }]}>
                        <Text category="h5" style={{ color: "#2B41AF", paddingTop: 10 }}>
                            Log In
                        </Text>
                        <TouchableOpacity
                            disabled={this.state.disabled}
                            onPress={async () => await this.handlePreferenceSetup()}
                        >
                            <View
                                style={[
                                    sharedStyles.circleBtn,
                                    { backgroundColor: this.state.disabled ? "grey" : "#2B41AF" }
                                ]}
                            >
                                <Image
                                    source={require("../../assets/icons/right-arrow.png")}
                                    style={[sharedStyles.fab, { tintColor: "white" }]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Layout>
        );
    }
}
