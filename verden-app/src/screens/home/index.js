import React from "react";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";

export function Home() {

    return (
        <NativeBaseProvider>
            <Text>Home!</Text>
        </NativeBaseProvider>
    );
}