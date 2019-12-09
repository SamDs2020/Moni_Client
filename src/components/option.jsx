import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({});

export default function Option(props) {
    return (
        <View style={styles.option}>
            <Text style={{ textAlign: "center" }}>{props.option}</Text>
        </View>
    );
}
