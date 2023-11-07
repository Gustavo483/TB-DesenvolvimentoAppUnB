import {createDrawerNavigator} from "@react-navigation/drawer";
import {Feather} from "@expo/vector-icons";

import Home from "../hub/home";
import Create from "../pet/create";
import Profile from "../user/profile";
import ViewAllPets from "../pet/viewAllPets";
import CustomDrawer from "../../components/drawer/customDrawer";
import Details from "../pet/details";
import {StyleSheet} from "react-native";

const Drawer = createDrawerNavigator();

const initialRoute = 'Home'
export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName={initialRoute} drawerContent={props => <CustomDrawer {...props}/>}>
            <Drawer.Screen
                name={'Home'}
                component={Home}
                options={{
                    drawerIcon: ({color, size}) => <Feather name={"home"} color={color} size={size}/>,
                    drawerLabel: 'Home'
                }}
            />
            <Drawer.Screen
                name={"Profile"}
                component={Profile}
                options={{
                    drawerLabel: 'Meu Perfil'
                }}
            />
            <Drawer.Screen
                name={"Create"}
                component={Create}
                options={{
                    drawerLabel: 'Cadastro de Animais'
                }}
            />
            <Drawer.Screen
                name={'Pets'}
                component={ViewAllPets}
                options={{
                    drawerLabel: 'Pets'
                }}
            />
            <Drawer.Screen
                name={'details'}
                component={Details}
                options={{
                    drawerLabel: 'Detalhamento pet'
                }}
            />
        </Drawer.Navigator>
    )
}
