import Create from "../../app/pet/create";
import Profile from "../../app/user/profile";
import ViewPets from "../../app/pet/viewPets";
import Details from "../../app/pet/details";
import Notification from "../../app/notification/showNotification";
import Colors from "./Colors";
import Login from "../../app/autentication/login";
import Signup from "../../app/user/signup";

export const constant = {
    SPACING: 16,
    borderRadius: 10,
    titleFontSize: 24,
    textFontSize: 16,
    subTextFontSize: 14,
}


export const ScreensArray = [
    {route: 'Profile', label: 'Meu Perfil', icon: "user", component: Profile, showInDrawer: true,},
    {route: 'ViewPets', label: 'Meus Pets', icon: 'home', component: ViewPets, showInDrawer: true},
    {route: 'Pets', label: 'Pets', icon: "user", component: ViewPets, showInDrawer: true},
    {route: 'Create', label: 'Cadastro de Animais', icon: "user", component: Create, showInDrawer: true},
    {route: 'Notifies', label: 'Notificações', icon: "user", component: Notification, showInDrawer: true},
    {route: 'details', label: 'Detalhes', icon: "user", component: Details, showInDrawer: true},
];

export const ScreensArrayNot = [
    {route: 'Login', label: 'Login', icon: "user", component: Login, showInDrawer: true,},
    {route: 'Signup', label: 'Registre-se', icon: 'home', component: Signup, showInDrawer: true},
];

export const drawerMenu = [
    {
        title: "Atalhos",
        bg: Colors.menu1,
        // type: Icons.Feather, icon: 'settings',
        route: 'Atalhos',
        menuList: [
            {title: 'Cadastrar Pet', route: 'Create', label: 'Create', icon: "user", component: Create}
        ]
    }
]