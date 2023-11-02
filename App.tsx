import 'react-native-gesture-handler';
import Routes from "./app/routes";
import React, {useEffect} from "react";
import {useFonts} from "expo-font";
import {Roboto_400Regular, Roboto_500Medium} from "@expo-google-fonts/roboto";
import {Courgette_400Regular} from "@expo-google-fonts/courgette";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
            .then(() => {})
            .catch((e) => console.warn(e));
    }, []);
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Courgette_400Regular
    });

    if (fontsLoaded && !isReady) {
        setIsReady(true);

        SplashScreen.hideAsync()
            .then(() => {})
            .catch((e) => console.warn(e));
    }

    if (!isReady) {
        return null;
    }

    return (
        <Routes/>
    );
}