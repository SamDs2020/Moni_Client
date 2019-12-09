import { StyleSheet } from "react-native";

const centerFlex = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

export const styles = StyleSheet.create({
    header: {
        backgroundColor: "#FFC065",
        height: "40%",
        ...centerFlex,
        paddingTop: 30
    },
    progress: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        borderRadius: 20,
        backgroundColor: "#1A213E",
        width: "80%",
        height: "35%",
        marginTop: 15
    },
    option: {
        height: 110,
        width: 110,
        borderRadius: 200,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    layout: {
        flex: 1,
        flexDirection: "column",
        display: "flex",
        backgroundColor: "#f5f6fa"
    },
    header2: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: "20%",
        backgroundColor: "#070E2E",
        top: -100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    header3: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: "100%",
        backgroundColor: "white",
        top: -150,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    }
});
33;
