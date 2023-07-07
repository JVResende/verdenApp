import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function ExpressCalculator() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Calculadora Express</Text>
        </NativeBaseProvider>
    );
}