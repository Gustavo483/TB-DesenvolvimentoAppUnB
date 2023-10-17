import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import Login from "./app/autentication/login";
import CreateUser from "./app/user/createUser";
import ShowUser from "./app/user/showUser";
import CadastroAnimais from "./app/cadastros/cadastroAnimais";
import Home from "./app/hub/home";
import {useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import UserContext from "./context/UserContext";

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
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={options} name="Home" component={Home} />
                <Stack.Screen options={options} name="Login" component={Login} />
                <Stack.Screen options={options} name="CreateUser" component={CreateUser} />
                <Stack.Screen options={options} name="CadastroAnimais" component={CadastroAnimais} />
                <Stack.Screen options={options} name="ShowUser" component={ShowUser} />
            </Stack.Navigator>
      </UserContext.Provider>
    );
}

export default function App() {
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