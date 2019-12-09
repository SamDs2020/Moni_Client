import React from "react";
import {
  View,
  StatusBar,
  ViewProps,
  StatusBarStyle,
  Platform
} from "react-native";
import Constants from "expo-constants";

class DynamicStatusBarComponent extends React.Component {
  render() {
    const androidStatusBarBgColor = this.props.barBgColor || "#fff";
    const barStyle = this.props.barStyle || "dark-content";

    const styles = {
      container: {
        backgroundColor: "#fff" /* default */,
        height: Platform.select({
          ios: this.props.zeroHeight ? 0 : Constants.statusBarHeight,
          android: 0
        }),
        ...this.props.style
      }
    };

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

export default DynamicStatusBarComponent;
