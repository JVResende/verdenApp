import React from "react";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";

export function Signup() {

    return (
        <NativeBaseProvider>
            <Text>Cadastro!</Text>
        </NativeBaseProvider>
    );
}