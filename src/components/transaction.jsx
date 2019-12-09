import React, { Component } from "react";
import {} from "react-native-ui-kitten";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

const styles = StyleSheet.create({
    transaction: {
        flex: 1,
        flexGrow: 1,
        padding: 5,
        flexDirection: "column",
        borderBottomColor: "#2F45B4",
        borderBottomWidth: 0.5
    },
    transactionInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    image: {
        resizeMode: "contain",
        tintColor: "#2F45B4",
        height: 40,
        width: 40,
        marginRight: 10
    }
});

export default function Transaction(props) {
    return (
        <TouchableOpacity>
            <View style={styles.transaction}>
                <Text style={{ color: "#2F45B4", paddingHorizontal: 5 }}>21st October 2019</Text>
                <View style={styles.transactionInfo}>
                    <Image style={styles.image} source={require("../../assets/hotel.png")} />
                    <Text style={{ flex: 1, flexWrap: "wrap", color: "#2F45B4" }}>Luxury Room</Text>
                    <Text style={{ color: props.color }}>+ M5.00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
