import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "../core/SafeAreaView";
import { BottomNavigation, BottomNavigationTab } from "react-native-ui-kitten";

class MenuComponent extends React.Component {
    onTabSelect = index => {
        this.props.onTabSelect(index);
    };

    render() {
        const { selectedIndex, themedStyle } = this.props;

        return (
            <SafeAreaView>
                <BottomNavigation
                    indicatorStyle={{ backgroundColor: "#FFD8A0" }}
                    selectedIndex={selectedIndex}
                    onSelect={this.onTabSelect}
                >
                    <BottomNavigationTab
                        title="Home"
                        icon={() => <Image source={require("../../assets/icons/home.png")} />}
                    />
                    <BottomNavigationTab
                        title="Balance"
                        icon={() => <Image source={require("../../assets/icons/transaction.png")} />}
                    />
                    <BottomNavigationTab
                        title="QR"
                        icon={() => <Image source={require("../../assets/icons/qr-code1.png")} />}
                    />
                    <BottomNavigationTab
                        title="MyCard"
                        icon={() => <Image source={require("../../assets/icons/credit-card.png")} />}
                    />
                    <BottomNavigationTab
                        title="Profile"
                        icon={() => <Image source={require("../../assets/icons/user.png")} />}
                    />
                </BottomNavigation>
            </SafeAreaView>
        );
    }
}

export default MenuComponent;
