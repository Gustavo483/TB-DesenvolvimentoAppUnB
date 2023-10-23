import {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { navigation } from "./styles/global";
import { auth } from "./config/firebaseConfig";
import * as SplashScreen from "expo-splash-screen";
import Login from "./app/autentication/login";
import Signup from "./app/user/signup";
import Profile from "./app/user/profile";
import Create from "./app/pet/create";
import Home from "./app/hub/home";

const Stack = createStackNavigator();

function MyStack() {
    const initialRoute  = auth.currentUser ? 'Home' : 'Login'
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen options={navigation} name="Home" component={Home} />
            <Stack.Screen options={navigation} name="Login" component={Login} />
            <Stack.Screen options={navigation} name="Signup" component={Signup} />
            <Stack.Screen options={navigation} name="Create" component={Create} />
            <Stack.Screen options={navigation} name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

export default function App({navigation}) {
    const [isReady, setIsReady] = useState(false);

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
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}