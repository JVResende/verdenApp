import React from "react";
import { NativeBaseProvider, VStack, Text, Image, Center, Button } from "native-base";
import homeImage from "../../../assets/homeImage.png";
import { useNavigation } from "@react-navigation/native";

export function Welcome() {

    const navigation = useNavigation();

    return (
        <NativeBaseProvider>
            <VStack flex={1} safeArea mt={16} px={8}>
                <Text
                    color="#00875F"
                    fontWeight="bold"
                    fontSize={32}
                    mb={6}
                >
                    Bem vindo à Plataforma Verden
                </Text>
                <Text
                    fontSize={16}
                >
                    A plataforma Verden facilita o cálculo e a compensação de emissões de gases de efeito estufa da sua frota de veículos.
                </Text>
                <Image source={homeImage} size={64} resizeMode="contain" alt="logo" alignSelf="center" my={12} />
                <Center>
                    <Button
                        width="full"
                        h={16}
                        bg="#00875F"
                        _pressed={{
                            bgColor: "#02583f"
                        }}
                        onPress={() => navigation.navigate("signup")}
                    >
                        <Text
                            fontSize="md"
                            color="white"
                        >
                            Cadastrar
                        </Text>
                    </Button>
                    <Button
                        mt={2}
                        width="full"
                        h={16}
                        bg="whitesmoke"
                        borderColor="#00875F"
                        borderWidth="1"
                        _pressed={{
                            bgColor: "gray.200"
                        }}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text
                            fontSize="md"
                            color="#00875F"
                        >
                            Fazer Login
                        </Text>
                    </Button>
                </Center>
            </VStack>
        </NativeBaseProvider>
    );
}