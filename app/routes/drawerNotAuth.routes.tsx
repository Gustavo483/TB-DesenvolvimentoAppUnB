import {createDrawerNavigator} from "@react-navigation/drawer";
import Login from "../autentication/login";
import Signup from "../user/signup";
import CustomDrawer from "../../components/drawer/customDrawer";

const Drawer = createDrawerNavigator();

const initialRoute = 'Login'
export default function DrawerNotAuthRoutes() {
    return (
        <Drawer.Navigator initialRouteName={initialRoute} drawerContent={props => <CustomDrawer {...props}/>}>
            <Drawer.Screen
                name={'Login'}
                component={Login}
                options={{
                    drawerLabel: 'Login'
                }}
            />
            <Drawer.Screen
                name={'Signup'}
                component={Signup}
                options={{
                    drawerLabel: 'Registrar Usuário'
                }}
            />
        </Drawer.Navigator>
    )
}