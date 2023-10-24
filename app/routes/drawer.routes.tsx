import {createDrawerNavigator} from "@react-navigation/drawer";
import {Feather} from "@expo/vector-icons";

import Home from "../hub/home";
import Create from "../pet/create";
import Profile from "../user/profile";
import CustomDrawer from "../../components/drawer/customDrawer";

const Drawer = createDrawerNavigator();

const initialRoute = 'Home'
export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName={initialRoute} drawerContent={props => <CustomDrawer {...props}/>}>
            <Drawer.Screen
                name={"Home"}
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
        </Drawer.Navigator>
    )
}