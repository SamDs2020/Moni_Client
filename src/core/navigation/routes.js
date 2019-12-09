import { useScreens } from "react-native-screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import MenuContainer from "../../container/menu.container";
import Home from "../../views/home";
import QRCode from "../../views/qrcode";
import Profile from "../../views/profile";
import Login from "../../views/login";
import Registration from "../../views/registration";
import OtpVerification from "../../views/otpverfication";
import Balance from "../../views/balance";
import QR from "../../views/qr";
import MyCard from "../../views/mycard";
import Survey from "../../views/survey";
import Welcome from "../../views/welcome";

const MenuNavigator = createBottomTabNavigator(
  {
    ["Home"]: Home,
    ["Balance"]: Balance,
    ["Qr"]: QR,
    ["MyCard"]: MyCard,
    ["Profile"]: Profile
  },
  {
    tabBarComponent: MenuContainer
  }
);

const AppNavigator = createStackNavigator(
  {
    ["login"]: Login,
    ["home"]: MenuNavigator,
    ["registration"]: Registration, //TODO: to be changed
    ["otpVerification"]: OtpVerification,
    ["survey"]: Survey,
    ["welcome"]: Welcome
  },
  {
    headerMode: "screen",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const createAppRouter = container => {
  useScreens();
  return createAppContainer(container);
};

export default createAppRouter(AppNavigator);
