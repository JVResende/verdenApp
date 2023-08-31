import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login";
import { Signup } from "../screens/signup";
import { Welcome } from '../screens/welcome';
import { CreateCompany } from '../screens/createCompany';
import { ForgotPassword } from '../screens/forgotPassword';
import { ResetPassword } from '../screens/resetPassword';
import { DrawerRoutes } from './drawer.routes';
import { GlobalStateContext } from "../global/globalStateContext";
import { ExpressCalculationSteps } from "../screens/expressCalculationSteps";
import { StoredExpressCalculations } from "../screens/storedExpressCalculations";

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {

    const { showBackButton } = useContext(GlobalStateContext)

    return (
        <Navigator initialRouteName='stackHome'>
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
                    headerBackVisible: showBackButton
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
                name="stackHome"
                component={DrawerRoutes}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="expressCalculationSteps"
                component={ExpressCalculationSteps}
                options={{
                    title: "Calculadora de Emissões",
                    headerTitleAlign: "center",
                }}
            />
            <Screen
                name="storedExpressCalculations"
                component={StoredExpressCalculations}
                options={{
                    title: "Cálculos Cadastrados",
                    headerTitleAlign: "center",
                }}
            />
        </Navigator >
    )
}