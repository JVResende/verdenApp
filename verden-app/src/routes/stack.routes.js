import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/home";
import { Login } from "../screens/login";
import { Signup } from "../screens/signup";
import { Welcome } from '../screens/welcome';

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
    return (
        <Navigator>
            <Screen
                name="welcome"
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="login"
                component={Login}
                options={{
                    title: "Login",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="signup"
                component={Signup}
                options={{
                    title: "Cadastro",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="home"
                component={Home}
                options={{
                    title: "Página Inicial",
                    headerTitleAlign: "center",
                }}
            />
        </Navigator >
    )
}