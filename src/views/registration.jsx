import React from "react";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert
} from "react-native";
import { $axios } from "../utilities/helper";
import ScrollableAvoidKeyboardComponent from "../components/scrollableAvoidKeyboard.component";
import { Text, Input, Select } from "react-native-ui-kitten";
import { Dropdown, } from "react-native-material-dropdown";
import Banner from "../components/banner";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { Snackbar } from "react-native-paper";

export default class Registration extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);

        this.state = {
            showLoadingModal: false,
            credentials: {
                name: "johnpaul",
                email: "torsxperience@outlook.com",
                phoneNumber: "09052814862",
                ageRange: "",
                gender: "",
                password: "12345678",
                confirmPassword: "12345678"
            },
            visible: false,
            registrationMessage: "",
            editable: true,
            disabled: false,
            registering: false,
            error: false
        };
    }

    componentDidUpdate() {
        if (this.state.showLoadingModal) this.animation.play()
    }

    clearInputs() {
        const obj = { ...this.state };
        obj.credentials.email = "";
        obj.credentials.password = "";
        obj.credentials.name = "";
        obj.credentials.phoneNumber = "";
        obj.credentials.confirmPassword = "";
        obj.credentials.gender = "";
        obj.credentials.ageRange = "";

        this.setState({ ...this.state, obj });
    }

    verifyPassword() {
        if (
            this.state.credentials.password.trim() === "" ||
            this.state.credentials.confirmPassword.trim() === ""
        )
            return;
        if (
            this.state.credentials.password.trim() ===
            this.state.credentials.confirmPassword.trim()
        )
            return true;
        return false;
    }


    showErrorAlert(message) {
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK', onPress: () => { } },
            ],
            { cancelable: false },
        );
    }

    async handleRegistration() {
        this.setState({
            ...this.state,
            editable: false,
            inputDisabled: true,
            registering: true,
            error: false
        });
        
        // @ts-ignore
        if (
            this.state.credentials.email.trim() === "" ||
            this.state.credentials.password.trim() === "" ||
            this.state.credentials.name.trim() === "" ||
            this.state.credentials.phoneNumber.trim() === "" ||
            this.state.credentials.confirmPassword.trim() === "" ||
            this.state.credentials.gender.text.trim() === "" ||
            this.state.credentials.ageRange.text.trim() === ""
        ) {
            console.log("Error");
            this.showErrorAlert("Please fill out the form completely")
        }

        this.setState({ showLoadingModal: true })

        const obj = { ...this.state.credentials };

        obj.gender = this.state.credentials.gender.text;
        obj.ageRange = this.state.credentials.ageRange.text;

        delete obj.confirmPassword;
        const axiosInstance = await $axios();
        axiosInstance
            .post("/user/register", obj)
            .then(res => {
                if (!res.data) throw "Ply try again";
                this.setState({
                    visible: true,
                    inputDisabled: false,
                    registrationMessage: "Registration Successful!",
                    registering: false,
                    editable: true,
                    error: false,
                    showLoadingModal: false
                });
                console.log(res.data);
                const { id } = res.data;
                setTimeout(() => {
                    this.clearInputs();
                    this.props.navigation.navigate("otpVerification", { userId: id });
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                this.setState({ showLoadingModal: false});
                console.log(error.response.data.error);
                this.showErrorAlert(Object.toString(error))
            });
    }
    togglePopup() {
        this.setState({ visible: !this.state.visible });
    }
    render() {
        const styles = StyleSheet.create({
            rootContainer: {
                flex: 1,
                backgroundColor: "#070E2E"
            },
            form: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            },
            inputs: {
                width: "100%"
            },
            textInput: {
                height: 50,
                padding: 5,
                fontSize: 17,
                color: "white",
                marginTop: 2,
                marginBottom: 2,
                borderBottomColor: "white",
                borderBottomWidth: 1
            },
            rowAlign: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
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
                width: 25,
                height: 25,
                resizeMode: "contain",
                tintColor: "#fff"
            }
        });
        const dropdownData = {
            ageRange: [{ text: "15 - 20" }, { text: "20 - 25" }, { text: "25 - 30" }],
            gender: [{ text: "male" }, { text: "female" }]
        };
        // @ts-ignore
        const { navigate } = this.props.navigation;
        const backgroundColor = this.state.error ? "red" : "green";
        return (
            <ScrollableAvoidKeyboardComponent>
                <StatusBar barStyle="dark-content"></StatusBar>
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={{ flexGrow: 1, alignItems: "center", marginHorizontal: 30, marginBottom: 60, justifyContent: "center" }}>
                        <Image style={{ resizeMode: "contain", width: "80%", height: 80, marginTop: 40, marginBottom: 30 }} source={require("../../assets/lm1.png")}></Image>
                        <Snackbar
                            visible={this.state.visible}
                            onDismiss={() => this.togglePopup()}
                            style={{ backgroundColor, textAlign: "center" }}
                            duration={3000}
                        >
                            <Text style={{ color: "white" }}>
                                {this.state.registrationMessage}
                            </Text>
                        </Snackbar>
                        <View style={styles.inputs}>
                            <ScrollView>
                                <Input
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                name: text
                                            }
                                        })
                                    }
                                    placeholderTextColor="white"
                                    style={styles.Input}
                                    selectionColor="#676B7F"
                                    placeholder="Name"
                                    value={this.state.credentials.name}
                                    editable={this.state.editable}
                                ></Input>
                                <Input
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                phoneNumber: text
                                            }
                                        })
                                    }
                                    placeholderTextColor="white"
                                    selectionColor="#676B7F"
                                    placeholder="Phone Number"
                                    value={this.state.credentials.phoneNumber}
                                    keyboardType="numeric"
                                    editable={this.state.editable}
                                ></Input>
                                <Input
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                email: text
                                            }
                                        })
                                    }
                                    placeholderTextColor="white"
                                    selectionColor="#676B7F"
                                    placeholder="Email"
                                    value={this.state.credentials.email}
                                    keyboardType="email-address"
                                    editable={this.state.editable}
                                ></Input>
                                <Select
                                    onSelect={option =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                ageRange: option
                                            }
                                        })
                                    }
                                    placeholder="Age Range"
                                    selectedOption={this.state.credentials.ageRange}
                                    data={dropdownData.ageRange}
                                />
                                <Select
                                    onSelect={option =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                gender: option
                                            }
                                        })
                                    }
                                    placeholder="Gender"
                                    selectedOption={this.state.credentials.gender}
                                    data={dropdownData.gender}
                                />
                                <Input
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                password: text
                                            }
                                        })
                                    }
                                    selectionColor="#676B7F"
                                    placeholderTextColor="white"
                                    placeholder="Password"
                                    keyboardAppearance="dark"
                                    secureTextEntry={true}
                                    value={this.state.credentials.password}
                                    editable={this.state.editable}
                                ></Input>
                                <Input
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            credentials: {
                                                ...this.state.credentials,
                                                confirmPassword: text
                                            }
                                        })
                                    }
                                    selectionColor="#676B7F"
                                    placeholder="Confirm Password"
                                    placeholderTextColor="white"
                                    keyboardAppearance="dark"
                                    secureTextEntry={true}
                                    value={this.state.credentials.confirmPassword}
                                    editable={this.state.editable}
                                ></Input>
                                <View style={[styles.rowAlign, { marginTop: 10 }]}>
                                    <Text
                                        category="h4"
                                        style={{ color: "#000", paddingTop: 10 }}
                                    >Sign Up</Text>
                                    <TouchableOpacity
                                        disabled={this.state.disabled}
                                        onPress={async () => await this.handleRegistration()}
                                    >
                                        <View style={styles.circleBtn}>
                                            <Image
                                                source={require("../../assets/icons/right-arrow.png")}
                                                style={styles.fab}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                </View>
                <Modal
                    isVisible={this.state.showLoadingModal}
                    style={{
                        padding: 0,
                        margin: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 250,
                            height: 250,
                        }}
                        source={require('../../assets/lottie/cube-loader.json')}
                    />
                </Modal>
            </ScrollableAvoidKeyboardComponent>
        );
    }
}
