import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawer from "../../components/drawer/customDrawer";
import {ScreensArray} from "../../components/constants/constants";

const Drawer = createDrawerNavigator();

const initialRoute = 'Pets'
export default function DrawerRoutes() {
    const filteredScreens = ScreensArray.filter((item) => item.showInDrawer);

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'slide',
                overlayColor: 'transparent',
                // drawerStyle: styles.drawerStyle,
                // drawerActiveBackgroundColor: Colors.primary,
            }}
            initialRouteName={initialRoute}
            drawerContent={props => <CustomDrawer {...props}/>}>
            {filteredScreens.map((item, index) => {
                return (
                    <Drawer.Screen key={index} name={item.route} component={item.component}
                                   options={{
                                       drawerLabel: item.label
                                   }}
                    />
                )
            })}
        </Drawer.Navigator>
    )
}