import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useEffect } from "react";
// import * as Font from 'expo-font';

const Stack = createStackNavigator();
const Spacer = ({space}) => <View style={{height: space}} />;

function HomeScreen({ navigation }) {
  return (
      <View style={styles.view}>
        <Pressable style={styles.standardButton} title="Go to Details" onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.standardButtonText}>ACESSAR</Text>
        </Pressable>
      </View>
  );
}

function RegisterScreen() {
  return (
      <View style={styles.view}>
        <Text style={styles.focusText}>Ops!</Text>
          <Spacer space={46} />
        <Text style={styles.standardText}>Você não pode realizar esta ação sem possuir um cadastro.</Text>
          <Spacer space={10} />
        <Pressable style={styles.standardButton} title="FAZER CADASTRO" onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.standardButtonText}>FAZER CADASTRO</Text>
        </Pressable>
          <Spacer space={30} />
        <Text style={styles.standardText}>Já possui cadastro?</Text>
          <Spacer space={10} />
        <Pressable style={styles.standardButton} title="FAZER LOGIN" onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.standardButtonText}>FAZER LOGIN</Text>
        </Pressable>
      </View>
  );
}

export default function App() {
    // useEffect(() => {
    //     (async () => await Font.loadAsync({
    //         'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    //         'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    //         'Courgette-Regular': require('./assets/fonts/Courgette-Regular.ttf'),
    //     }))();
    // }, []);
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={styles.navigationHeader} name="Home" component={HomeScreen} />
          <Stack.Screen options={styles.navigationHeader} name="Cadastro" component={RegisterScreen} />
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
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  standardButton: {
    boxShadow: '0px 1px 4px #000000bf',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#88c9bf',
    minWidth: 232
  },
  standardButtonText: {
    letterSpacing: 0,
    fontSize: 12,
    fontWeight: '400',
    color: '#434343',
    // fontFamily: 'Roboto-Regular'
  },
  standardText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#bdbdbd',
    // fontFamily: 'Roboto-Regular',
  },
  focusText: {
    fontSize: 50,
    color: '#88C9BF',
    // fontFamily: 'Courgette-Regular',
  }
});
