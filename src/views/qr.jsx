import React, { Component } from "react";
import { View, Image } from "react-native";
import { Text, Layout } from "react-native-ui-kitten";
import Banner from "../components/banner";
import QRCode from "react-native-qrcode-svg";
import { styles } from "../styles/qrcode.style";
import { GetTokenInfo } from "../utilities/helper";

export default class QR extends Component {
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
                        <Text style={{ fontSize: 18, paddingRight: 10 }}>{this.state.user}</Text>
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
                <View style={{ width: "70%" }}>
                    <Text style={{ textAlign: "center", color: "#7f8c8d" }}>
                        Your personal Landmark Citizen ID QR, Show this QR to Redeem or Earn Points
                    </Text>
                </View>
            </Layout>
        );
    }
}
