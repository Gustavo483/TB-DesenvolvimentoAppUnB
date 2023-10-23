import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import Login from "./app/autentication/login";
import Signup from "./app/user/signup";
import Profile from "./app/user/profile";
import Create from "./app/pet/create";
import Home from "./app/hub/home";
import React, {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { auth } from "./config/firebaseConfig";

const Stack = createStackNavigator();

const options: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#CFE9E5'
    },
    headerTitleStyle: {
        fontFamily: 'Roboto_500Medium',
    }
};

function MyStack() {
    const initialRoute  = auth.currentUser ? 'Home' : 'Login'
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen options={options} name="Home" component={Home} />
            <Stack.Screen options={options} name="Login" component={Login} />
            <Stack.Screen options={options} name="CreateUser" component={Signup} />
            <Stack.Screen options={options} name="CadastroAnimais" component={Create} />
            <Stack.Screen options={options} name="ShowUser" component={Profile} />
        </Stack.Navigator>
    );
}

export default function App({navigation}) {
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
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}