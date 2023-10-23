import {createDrawerNavigator} from "@react-navigation/drawer";
import {Feather} from "@expo/vector-icons";

import Home from "../hub/home";
import Login from "../autentication/login";
import Signup from "../user/signup";
import Create from "../pet/create";
import Profile from "../user/profile";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name={"Home"}
                component={Home}
                options={{
                    drawerIcon: ({color, size}) => <Feather name={"home"} color={color} size={size} />,
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
                name={"Login"}
                component={Login}
                options={{
                    drawerLabel: 'Login'
                }}
            />
            <Drawer.Screen
                name={"Signup"}
                component={Signup}
                options={{
                    drawerLabel: 'Signup'
                }}
            />
            <Drawer.Screen
                name={"Create"}
                component={Create}
                options={{
                    drawerLabel: 'Create'
                }}
            />
        </Drawer.Navigator>
    )
}