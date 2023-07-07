import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Imports() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Importações</Text>
        </NativeBaseProvider>
    );
}