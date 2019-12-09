import React from "react";
import { BottomNavigation, BottomNavigationTab, ApplicationProvider } from "react-native-ui-kitten";
import { mapping, light as lightTheme, dark as darkTheme } from "@eva-design/eva";

export default class BottomNavigation extends React.Component {
    state = {
        selectedIndex: 0
    };

    onTabSelect = selectedIndex => {
        this.setState({ selectedIndex });
    };

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <BottomNavigation selectedIndex={this.state.selectedIndex} onSelect={this.onTabSelect}>
                    <BottomNavigationTab title="Home" />
                    <BottomNavigationTab title="Tab 2" />
                    <BottomNavigationTab title="Tab 3" />
                </BottomNavigation>
            </ApplicationProvider>
        );
    }
}
