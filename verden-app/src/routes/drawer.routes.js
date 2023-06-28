import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { TabRoutes } from './tab.routes';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../screens/profile';

const { Navigator, Screen } = createDrawerNavigator()

export function DrawerRoutes() {

    const navigation = useNavigation()

    const logout = async () => {
        await AsyncStorage.removeItem("@token")
        navigation.navigate("login")
    }

    return (
        <Navigator screenOptions={{ title: 'VERDEN ESG', headerTintColor: 'white', headerStyle: { backgroundColor: "#00875F" } }} drawerContent={props => {
            return (
                <>
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                    <DrawerItem
                        label="Sair"
                        labelStyle={{ color: '#cb2c18' }}
                        icon={({ size }) => <Feather name='log-out' color='#cb2c18' size={size}></Feather>}
                        onPress={logout}
                    />
                </>
            )
        }}>
            <Screen
                name="drawerProfile"
                component={Profile}
                options={{
                    drawerLabel: "Perfil",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <Feather name='user' color={color} size={size}></Feather>,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerHome"
                component={TabRoutes}
                options={{
                    drawerLabel: "Painel",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size}></Feather>,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />

        </Navigator >
    )
}