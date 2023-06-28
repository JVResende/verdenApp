import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Calculator() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Calculadora</Text>
        </NativeBaseProvider>
    );
}