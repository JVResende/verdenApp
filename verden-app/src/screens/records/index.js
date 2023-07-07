import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Records() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Cadastros</Text>
        </NativeBaseProvider>
    );
}