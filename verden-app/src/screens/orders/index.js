import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Orders() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Pedidos</Text>
        </NativeBaseProvider>
    );
}