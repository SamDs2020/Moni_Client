import React from "react";
import { Platform } from "react-native";
import {
  SafeAreaView as SafeAreaViewReactNavigation,
} from "react-navigation";
import Constants from "expo-constants";

export class SafeAreaView extends React.Component {
  statusBarHeight = Platform.select({
    ios: Constants.statusBarHeight,
    android: 0
  });

  componentDidMount() {
    // https://github.com/expo/expo/issues/2940#issuecomment-445937038

    SafeAreaViewReactNavigation.setStatusBarHeight(this.statusBarHeight);
  }

  render() {
    return <SafeAreaViewReactNavigation {...this.props} />;
  }
}
