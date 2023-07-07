import * as React from 'react';

import { Home } from '../screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Profile } from '../screens/profile';

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="tabHome"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size}></Feather>,
                    tabBarLabel: 'Painel',
                    tabBarLabelStyle: {marginTop: -4, marginBottom: 4 },
                    tabBarActiveTintColor: '#00875F'
                    
                }}
            />
            <Screen
                name="tabProfile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='user' color={color} size={size}></Feather>,
                    tabBarLabel: 'Perfil',
                    tabBarLabelStyle: { marginTop: -4, marginBottom: 4 },
                    tabBarActiveTintColor: '#00875F'
                }}
            />
        </Navigator >
    )
}