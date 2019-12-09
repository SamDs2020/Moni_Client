import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "#f5f6fa",
        alignItems: "center"
    },
    transactionText: {
        borderTopColor: "black",
        borderBottomColor: "black",
        borderWidth: 0.5,
        width: "100%",
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 10,
        borderTopColor: "#2F45B4",
        borderBottomColor: "#2F45B4"
    },
    balance: {
        top: -30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        paddingVertical: 10,
        paddingHorizontal: 50,
        minHeight: 90,
        maxWidth: 290,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center"
    },
    transactions: {
        width: "90%",
        backgroundColor: "white",
        flex: 1,
        marginBottom: 10
    }
});
