import React, { useState } from "react";
import { Button, Divider, HStack, NativeBaseProvider, ScrollView, Text, VStack } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { ExpressCalculationCard } from "../../components/expressCalculationCard";
import { Dimensions } from "react-native";

export function StoredExpressCalculations() {

    useProtectedPage()

    const windowHeight = Dimensions.get('window').height

    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack
                    flex={1}
                    safeArea
                    px={8}
                    mt={6}
                    h={windowHeight * 0.8}
                >
                    <Text
                        fontSize={16}
                        mb={2}
                    >
                        Abaixo você pode ver os seus lançamentos antes de realizar o cálculo das emissões. Você pode remover ou adicionar mais veículos ao lançamento.
                    </Text>
                    <Text
                        fontSize={16}
                        mb={6}
                    >
                        Se estiver tudo certo, é só avançar clicando em <Text fontSize={16} fontWeight="bold">Calcular Emissões.</Text>
                    </Text>
                    <HStack paddingLeft={4}>
                        <Text w="40%" fontSize="sm" mr={15} color="#757575">
                            Categoria
                        </Text>
                        <Text w="40%" fontSize="sm" color="#757575">
                            Ano de fabricação
                        </Text>
                    </HStack>
                    <Divider my={3} />
                    <ExpressCalculationCard />
                    <HStack width="full" justifyContent="space-between" position="absolute" bottom={0} alignSelf="center">
                        <Button
                            width="47%"
                            h={16}
                            borderWidth="1"
                            borderColor="#00875F"
                            bg="whitesmoke"
                            _pressed={{
                                bgColor: "gray.200"
                            }}
                        >
                            <Text
                                fontSize="sm"
                                color="#00875F"
                            >
                                Adicionar Veículos
                            </Text>
                        </Button>
                        <Button
                            width="47%"
                            h={16}
                            bg="#00875F"
                            _pressed={{
                                bgColor: "#02583f"
                            }}
                        >
                            <Text
                                fontSize="sm"
                                color="white"
                            >
                                Calcular Emissões
                            </Text>
                        </Button>

                    </HStack>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
}