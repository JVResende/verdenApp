import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Budgets() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Orçamentos</Text>
        </NativeBaseProvider>
    );
}