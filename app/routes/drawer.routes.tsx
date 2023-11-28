import {createDrawerNavigator} from "@react-navigation/drawer";
import {Feather} from "@expo/vector-icons";

import Create from "../pet/create";
import Profile from "../user/profile";
import ViewPets from "../pet/viewPets";
import CustomDrawer from "../../components/drawer/customDrawer";
import Details from "../pet/details";
import Notification from "../notification/showNotification";

const Drawer = createDrawerNavigator();

const initialRoute = 'Pets'
export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName={initialRoute} drawerContent={props => <CustomDrawer {...props}/>}>
            <Drawer.Screen
                name={'Pets'}
                component={ViewPets}
                options={{
                    drawerIcon: ({color, size}) => <Feather name={"home"} color={color} size={size}/>,
                    drawerLabel: 'Pets'
                }}
            />
            <Drawer.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    drawerLabel: 'Meu Perfil'
                }}
            />
            <Drawer.Screen
                name={'Create'}
                component={Create}
                options={{
                    drawerLabel: 'Cadastro de Animais'
                }}
            />
            <Drawer.Screen
                name={"Notifies"}
                component={Notification}
                options={{
                    drawerLabel: 'Notifies'
                }}
            />
            <Drawer.Screen
                name={'Meus Pets'}
                component={ViewPets}
                options={{
                    drawerLabel: 'Meus Pets'
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
