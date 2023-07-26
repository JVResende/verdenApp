import React, { useContext } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { TabRoutes } from './tab.routes';
import { Feather, MaterialCommunityIcons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExpressCalculator } from '../screens/expressCalculator';
import { PremiumCalculator } from '../screens/premiumCalculator';
import { Imports } from '../screens/imports';
import { Budgets } from '../screens/budgets';
import { Orders } from '../screens/orders';
import { Inventory } from '../screens/inventory';
import { Records } from '../screens/records';
import { MenuProfile } from '../components/menuProfile';
import { NativeBaseProvider } from 'native-base';
import { GlobalStateContext } from '../global/globalStateContext';

const { Navigator, Screen } = createDrawerNavigator()

export function DrawerRoutes() {

    const navigation = useNavigation()

    const { setShowBackButton } = useContext(GlobalStateContext)

    const logout = async () => {
        await AsyncStorage.removeItem("@token")
        setShowBackButton(false)
        navigation.navigate("login")
    }

    return (
        <Navigator screenOptions={{ title: 'VERDEN ESG', headerTintColor: 'white', headerStyle: { backgroundColor: "#00875F" } }} drawerContent={props => {
            return (
                <NativeBaseProvider>
                    <MenuProfile/>
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                    <DrawerItem
                        label="Sair"
                        labelStyle={{ color: '#cb2c18' }}
                        icon={({ size }) => <Feather name='log-out' color='#cb2c18' size={size}></Feather>}
                        onPress={logout}
                    />
                </NativeBaseProvider>
            )
        }}>
            <Screen
                name="drawerHome"
                component={TabRoutes}
                options={{
                    drawerLabel: "Painel Inicial",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size}></Feather>,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerExpressCalculator"
                component={ExpressCalculator}
                options={{
                    drawerLabel: "Calculadora Express",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="calculator-variant" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerPremiumCalculator"
                component={PremiumCalculator}
                options={{
                    drawerLabel: "Calculadora Premium",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="calculator-variant" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerImports"
                component={Imports}
                options={{
                    drawerLabel: "Importações",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <Fontisto name="arrow-swap" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerBudgets"
                component={Budgets}
                options={{
                    drawerLabel: "Orçamentos",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="text-box-multiple" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerOrders"
                component={Orders}
                options={{
                    drawerLabel: "Pedidos",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="cart" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerInventory"
                component={Inventory}
                options={{
                    drawerLabel: "Inventário",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialIcons name="inventory" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
            <Screen
                name="drawerRecords"
                component={Records}
                options={{
                    drawerLabel: "Cadastros",
                    headerTitleAlign: "center",
                    drawerIcon: ({ color, size }) => <MaterialIcons name="inventory" color={color} size={size} />,
                    drawerActiveBackgroundColor: 'whitesmoke',
                    drawerActiveTintColor: '#00875F'
                }}
            />
        </Navigator >
    )
}