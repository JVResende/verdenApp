import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/home';

const { Navigator, Screen } = createDrawerNavigator()

export function DrawerRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
                options={{
                    drawerLabel: "Página Inicial",
                    headerTitleAlign: "center"
                }}
            />
        </Navigator >
    )
}