import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Profile() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Perfil</Text>
        </NativeBaseProvider>
    );
}