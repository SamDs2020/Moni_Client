import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-ui-kitten";
import { Surface } from "react-native-paper";
import { styles } from "../styles/vendor.style";

export const Vendor = props => {
    return (
        <TouchableOpacity>
            <Surface style={[styles.surface, {backgroundColor: props.color}]}>
            </Surface>
        </TouchableOpacity>
    );
};
