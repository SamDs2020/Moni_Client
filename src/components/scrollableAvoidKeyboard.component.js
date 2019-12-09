import React from "react";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";

class ScrollableAvoidKeyboardComponent extends React.Component {
  render() {
    const {
      style,
      contentContainerStyle,
      ...restProps
    } = this.props;

    const styles = {
        container: {
          flex: 1
        },
        contentContainer: {
          flexGrow: 1
        }
      }
    return (
      <KeyboardAwareScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={[styles.container, style]}
        contentContainerStyle={[
          styles.contentContainer,
          contentContainerStyle
        ]}
        enableOnAndroid={true}
        {...restProps}
      />
    );
  }
}

export default ScrollableAvoidKeyboardComponent;
