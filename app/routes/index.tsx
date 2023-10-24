import {NavigationContainer} from '@react-navigation/native';
import DrawerRoutes from "./drawer.routes";
import {useAuth} from "../hooks/useAuth";
import DrawerNotAuthRoutes from "./drawerNotAuth.routes";

export default function Routes() {
    const {user} = useAuth()
    const routes = user ? <DrawerRoutes/> : <DrawerNotAuthRoutes/>;

    return (
        <NavigationContainer>
            {routes}
        </NavigationContainer>
    )
}