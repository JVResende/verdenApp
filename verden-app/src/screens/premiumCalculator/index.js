import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function PremiumCalculator() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Calculadora Premium</Text>
        </NativeBaseProvider>
    );
}