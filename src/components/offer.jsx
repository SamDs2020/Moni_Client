import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-ui-kitten";

export default function Offer(props) {
    const style = StyleSheet.create({
        card: {
            height: 200,
            width: 150,
            borderRadius: 10,
            backgroundColor: "white",
            margin: 10
            // shadowColor: "#000",
            // shadowOffset: { width: 0, height: 1 },
            // shadowOpacity: 0.8,
            // shadowRadius: 10,
            // elevation: 5
        },
        imageStyle: {
            height: 170,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            width: "100%",
            resizeMode: "stretch"
        },
        textContainer: {
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    });
    return (
        <View style={style.card}>
            <Image source={props.imagePath} style={style.imageStyle} />
            <View style={style.textContainer}>
                <Text style={{ textAlign: "center" }} category="s2">
                    {props.offerPoints}
                    {props.offerPoints > 1 ? " Gems" : " Gem"}
                </Text>
            </View>
        </View>
    );
}
