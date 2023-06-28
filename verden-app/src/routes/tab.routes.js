import * as React from 'react';

import { Home } from '../screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import { Calculator } from '../screens/calculator';

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
                name="tabCalculator"
                component={Calculator}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons  name="calculator-variant" color={color} size={size} />,
                    tabBarLabel: 'Calculadora',
                    tabBarLabelStyle: { marginTop: -4, marginBottom: 4 },
                    tabBarActiveTintColor: '#00875F'
                }}
            />
        </Navigator >
    )
}