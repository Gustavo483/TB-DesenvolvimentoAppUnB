import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./app/autentication/login";
import CreateUser from "./app/user/createUser";
import ShowUser from "./app/user/showUser";
import CadastroAnimais from "./app/cadastros/cadastroAnimais";
import Home from "./app/hub/home";
import React, {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Roboto_400Regular, Roboto_500Medium, useFonts} from "@expo-google-fonts/roboto";

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={styles.navigationHeader} name="Home" component={Home} />
        <Stack.Screen options={styles.navigationHeader} name="Login" component={Login} />
        <Stack.Screen options={styles.navigationHeader} name="CreateUser" component={CreateUser} />
        <Stack.Screen options={styles.navigationHeader} name="CadastroAnimais" component={CadastroAnimais} />
        <Stack.Screen options={styles.navigationHeader} name="ShowUser" component={ShowUser} />
      </Stack.Navigator>
  );
}

export default function App() {
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
            .then(() => {})
            .catch((e) => console.warn(e));
    }, []);
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium
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

const styles = StyleSheet.create({
  navigationHeader: {
    headerStyle: {
      backgroundColor: '#CFE9E5'
    },
    headerTitleStyle: {
      fontFamily: 'Roboto_500Medium',
    }
  }
});