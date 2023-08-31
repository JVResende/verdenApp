import React, { useContext } from "react";
import { Button, Image, NativeBaseProvider, ScrollView, Text, Toast, VStack } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import expressImage from "../../../assets/expressImage.png";
import { Alert, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { GlobalStateContext } from "../../global/globalStateContext";

export function ExpressCalculator() {

    useProtectedPage()

    const { companyCnpj } = useContext(GlobalStateContext)

    const navigation = useNavigation()

    const windowHeight = Dimensions.get('window').height

    const goToCalculator = () => {
        if (companyCnpj == "") {
            // Toast.show({
            //     description: ("É preciso ter pelo menos uma empresa selecionada para realizar o cálculo das emissões."),
            //     style: {
            //         backgroundColor: "red"
            //     }
            // })
            Alert.alert("", "É preciso ter pelo menos uma empresa selecionada para realizar o cálculo das emissões.", [
                { text: 'OK' },
            ])
        } else {
            navigation.navigate("expressCalculationSteps")
        }
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack
                    flex={1}
                    safeArea
                    px={8}
                    h={windowHeight * 0.8}
                >
                    <Text
                        mt={4}
                        fontSize={18}
                        fontWeight="bold"
                        alignSelf="center"
                        textAlign="center"
                    >
                        Calculadora de Emissões Veiculares (Versão Express)
                    </Text>
                    <Image
                        source={expressImage}
                        size={96}
                        resizeMode="contain"
                        alt="expressImage"
                        alignSelf="center"
                        my={-12}
                    />
                    <Text
                        fontSize={16}
                        mb={4}
                        alignSelf="center"
                    >
                        Com o Verden ESG você pode realizar o cálculo de suas emissões veículares. Teste a calculadora express sem nenhum custo.
                    </Text>
                    <Button
                        width="full"
                        h={16}
                        bg="#00875F"
                        position="absolute"
                        alignSelf="center"
                        bottom={0}
                        _pressed={{
                            bgColor: "#02583f"
                        }}
                        onPress={goToCalculator}
                    >
                        <Text
                            fontSize="md"
                            color="white"
                        >
                            Calcular Emissões
                        </Text>
                    </Button>
                </VStack>
            </ScrollView>

        </NativeBaseProvider>
    );
}