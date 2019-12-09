import React from "react";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import Router from "./src/core/navigation/routes";
import DynamicStatusBar from "./src/components/dynamicStatusBar.component";

function App() {
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <DynamicStatusBar
                zeroHeight={true}
                style={{ backgroundColor: "transparent" }}
                barStyle="dark-content"
            />            
            <Router />
        </ApplicationProvider>
    );
}
export default App;
