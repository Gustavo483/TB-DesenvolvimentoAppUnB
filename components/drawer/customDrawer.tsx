import React, {useState} from "react";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {
    Image,
    ImageBackground, LayoutAnimation,
    Pressable,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import {DrawerNavigationState, ParamListBase, useNavigation} from '@react-navigation/native'
import {DrawerDescriptorMap, DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types'
import {signOut, useAuth, User, avatar} from "../../app/hooks/useAuth";
import {Container} from "../Container";
import Colors from "../constants/Colors";
import Styles from "../common/Styles";
import {constant, drawerMenu} from "../constants/constants";
import {Row} from "../Row";


type Props = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const CustomDrawer = (props: Props) => {
    const navigation = useNavigation();
    const {user} = useAuth();
    const {userData} = User();
    const {userAvatar} = avatar();
    const [menuIndex, setMenuIndex] = useState(-1);

    let name = "";
    let logout = null;

    if (user) {
        logout = (
            <View style={{position: 'absolute',
                bottom: 0,width: '100%', padding: 20, backgroundColor: '#88c9bf', alignItems: 'center'}}>
                <Pressable onPress={() => signOut(navigation)}>
                    <Text>SAIR</Text>
                </Pressable>
            </View>
        );

        name = userData?.nome || '';
    }

    const toggleSubMenu = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        setMenuIndex(menuIndex === index ? -1 : index);
    };

    return (
        <Container>
            <View>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.header}>
                        <Image source={{uri: userAvatar}} style={styles.img}></Image>
                        <View>
                            <Text style={{fontSize:20}}>{name}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <DrawerItemList {...props} />
                {drawerMenu.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} activeOpacity={0.8}
                                          style={[styles.menu, {backgroundColor: item.bg + '99'}]}
                                          onPress={() => {
                                              LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
                                              setMenuIndex(menuIndex === index ? -1 : index)
                                          }}>
                            <Row style={styles.item}>
                                {/* ... (icon or image) */}
                                <Text style={[styles.text, {color: menuIndex === index ? Colors.black : Colors.gray}]}>
                                    {item.title}
                                </Text>
                            </Row>
                            {menuIndex === index && (
                                <View style={{borderRadius: constant.borderRadius, backgroundColor: item.bg}}>
                                    {item.menuList.map((subMenu, subIndex) => (
                                        <TouchableNativeFeedback key={subIndex}
                                                                 onPress={() => navigation.navigate(subMenu.route)}
                                        >
                                            <View style={styles.subMenu}>
                                                <Text>{subMenu.title}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
            {logout}
        </Container>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    img: {
        height: 64,
        width: 64,
        borderRadius: 40,
        marginBottom: 60,
        marginTop: 40,
        marginLeft: 16
    },
    header: {
        padding: 16,
        backgroundColor: Colors.menu2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light,
    },
    item: {
        paddingHorizontal: 16 / 1.5,
        paddingVertical: 16 / 1.2,
    },
    menu: {
        marginHorizontal: constant.SPACING / 1.7,
        marginVertical: constant.SPACING / 2.5,
        borderRadius: constant.borderRadius,
    },
    text: {
        fontSize: constant.textFontSize,
        paddingHorizontal: constant.SPACING,
    },
    subMenu: {
        paddingHorizontal: constant.SPACING,
        paddingVertical: constant.SPACING / 1.5,
    },
})
