import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-ui-kitten";

export default function Info(props) {
    const style = StyleSheet.create({
        card: {
            height: 220,
            width: 220,
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
            height: 130,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            width: "100%",
            resizeMode: "stretch"
        },
        textContainer: {
            padding: 5
        }
    });
    return (
        <View style={style.card}>
            <Image source={props.imagePath} style={style.imageStyle} />
            <View style={style.textContainer}>
                <Text category="s2">{props.title}</Text>
                <Text category="c1">{props.content}</Text>
            </View>
        </View>
    );
}
