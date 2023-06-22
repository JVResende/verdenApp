import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import { DrawerRoutes } from './drawer.routes';

export function Routes() {
    return (
        <NavigationContainer>
            <StackRoutes />
            <DrawerRoutes />
        </NavigationContainer>
    )

}