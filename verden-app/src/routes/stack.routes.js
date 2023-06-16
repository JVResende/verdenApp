import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/home";
import { Login } from "../screens/login";
import { Signup } from "../screens/signup";
import { Welcome } from '../screens/welcome';
import { CreateCompany } from '../screens/createCompany';
import { ForgotPassword } from '../screens/forgotPassword';
import { ResetPassword } from '../screens/resetPassword';

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
                name="forgotPassword"
                component={ForgotPassword}
                options={{
                    title: "Esqueceu sua Senha?",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="resetPassword"
                component={ResetPassword}
                options={{
                    title: "Redefinir Senha",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="signup"
                component={Signup}
                options={{
                    title: "Cadastrar",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="createCompany"
                component={CreateCompany}
                options={{
                    title: "Cadastrar Empresa",
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