import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'app/autentication/login';
import CreateUser from "./app/user/createUser";
import ShowUser from "./app/user/showUser";
import CadastroAnimais from "./app/cadastros/cadastroAnimais";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={styles.navigationHeader} name="Login" component={Login} />
          <Stack.Screen options={styles.navigationHeader} name="Cadastro Usuário" component={CreateUser} />
          <Stack.Screen options={styles.navigationHeader} name="Cadastro Animal" component={CadastroAnimais} />
          <Stack.Screen options={styles.navigationHeader} name="Perfil Usuário" component={ShowUser} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationHeader: {
    headerStyle: {
      backgroundColor: '#CFE9E5'
    },
    headerTitleStyle: {
      // fontFamily: 'Roboto-Medium',
    }
  }
});