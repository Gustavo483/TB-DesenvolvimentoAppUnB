import {createDrawerNavigator} from "@react-navigation/drawer";
import {ScreensArrayNot} from "../../components/constants/constants";
import Colors from "../../components/constants/Colors";

const Drawer = createDrawerNavigator();

const initialRoute = 'Login';

export default function DrawerNotAuthRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'slide',
                overlayColor: 'transparent',
                drawerActiveBackgroundColor: Colors.primary,
            }}
            initialRouteName={initialRoute}
        >
            {ScreensArrayNot.map((item, index) => (
                <Drawer.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        drawerLabel: item.label
                    }}
                />
            ))}
        </Drawer.Navigator>
    )
}