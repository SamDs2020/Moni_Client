import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "#f5f6fa",
        alignItems: "center"
    },

    qr: {
        top: -20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        padding: 20,
        maxWidth: 290,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center"
    }
});
