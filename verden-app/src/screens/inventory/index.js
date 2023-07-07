import React from "react";
import { NativeBaseProvider, Text } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export function Inventory() {

    useProtectedPage()

    return (
        <NativeBaseProvider>
            <Text>Inventário</Text>
        </NativeBaseProvider>
    );
}