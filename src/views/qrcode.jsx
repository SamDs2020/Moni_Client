import React from "react";
import { View } from "react-native";
import { Text, Layout, Surface } from "react-native-ui-kitten";
import QR from "react-native-qrcode-svg";
import { GetTokenInfo } from "../utilities/helper";

export default class QRCode extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            userId: ""
        };
    }

    async componentDidMount() {
        const info = await GetTokenInfo();
        this.setState({ ...this.state, userId: info.id });
        console.log(this.state);
    }

    render() {
        return this.state.userId ? <QR value="Hello world"></QR> : <Text>Nothing to convert😢</Text>;
    }
}
