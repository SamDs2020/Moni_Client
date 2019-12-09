import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    inputs: {
        width: "80%"
    },
    textInput: {
        height: 50,
        padding: 10,
        fontSize: 17,
        color: "white",
        margin: 0,
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    rowAlign: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 5
    },
    pickerStyle: {
        width: "45%"
    },
    circleBtn: {
        width: 60,
        height: 60,
        borderRadius: 120,
        backgroundColor: "#2B41AF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    fab: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    }
});
