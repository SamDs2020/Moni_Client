import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Banner(props) {
    const styles = StyleSheet.create({
        banner: {
            alignSelf: "stretch",
            height: 120,
            backgroundColor: "#FFC065",
            borderBottomLeftRadius: props.orientation === "straight" ? 0 : 100,
            borderBottomRightRadius: props.orientation === "straight" ? 0 : 100,
            transform: [{ scale: 1.2 }],
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
        },
        imageStyle: {
            margin: "auto",
            width: 200,
            height: 150,
            resizeMode: "contain"
        }
    });
    return (
        <View style={styles.banner}>
            {props.logo ? <Image source={props.logo} style={styles.imageStyle} /> : null}
            {props.children}
        </View>
    );
}
