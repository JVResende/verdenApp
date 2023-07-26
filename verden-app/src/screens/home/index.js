import React, { useEffect, useState, useContext } from "react";
import { NativeBaseProvider, ScrollView, VStack, Text, Select, Box, HStack } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import axios from "axios";
import { BASE_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { GlobalStateContext } from "../../global/globalStateContext";

export function Home() {

    useProtectedPage()

    const navigation = useNavigation()

    const [companies, setCompanies] = useState([])
    const [companyId, setCompanyId] = useState('')
    const [emission, setEmission] = useState('')

    const { resetPage } = useContext(GlobalStateContext)

    useEffect(() => {
        const getCompanies = async () => {
            const token = await AsyncStorage.getItem("@token")
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            axios.get(`${BASE_URL}/user/companies`, { headers: headers })
                .then((res) => {
                    setCompanies(res.data)
                })
                .catch(e => {
                    console.log(e)
                    if (e.message == "Request failed with status code 401" && token) {
                        Alert.alert("Seu login expirou!", "Faça o login novamente.", [
                            { text: 'OK', onPress: () => navigation.navigate("login") },
                        ])
                    }
                })
        }

        const getEmissions = async () => {
            const token = await AsyncStorage.getItem("@token")
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            axios.get(`${BASE_URL}/statistics/emissions/total`, { headers: headers })
                .then((res) => {
                    setEmission(res.data)
                })
                .catch(e => {
                    console.log(e.message)
                })
        }

        getEmissions()

        getCompanies()

    }, [resetPage])

    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack
                    flex={1}
                    safeArea
                    mt={6}
                    px={8}
                >
                    <Text
                        fontSize={16}
                        mb={4}
                    >
                        Selecione uma empresa cadastrada na plataforma Verden:
                    </Text>
                    <Select
                        w="full"
                        placeholder="Selecione uma empresa"
                        fontSize={16}
                        selectedValue={companyId}
                        onValueChange={itemValue => setCompanyId(itemValue)}
                    >
                        {companies.map((item, index) => {
                            return (
                                <Select.Item value={item.id} key={index} label={item.corporate_name} />
                            );
                        })}
                    </Select>
                    <Box
                        mt={8}
                        borderRadius={8}
                        shadow={2}
                        padding={4}
                        backgroundColor="#00875F"
                    >
                        <Text
                            color="white"
                            fontSize={16}
                            mb={4}
                        >
                            Volume total de emissões armazenadas
                        </Text>
                        <HStack alignItems="center" justifyContent="center">
                            <Text
                                color="white"
                                fontSize={32}
                                fontWeight="bold"
                                mb={4}
                                mr={2}
                            >
                                {emission.total}
                            </Text>
                            <Text
                                color="white"
                                fontSize={16}
                                mb={3}
                            >
                                tCO2
                            </Text>
                        </HStack>


                    </Box>
                    <Box
                        my={8}
                        borderRadius={8}
                        shadow={2}
                        padding={4}
                        backgroundColor="#fff"
                    >
                        <Text
                            fontSize={16}
                            fontWeight={500}
                            mb={4}
                        >
                            Dicas para diminuir sua pegada de carbono
                        </Text>
                        <Text
                            fontSize={16}
                            mb={1}
                        >
                            • Estabeleça políticas de viagens sustentáveis e substitua o consumo e a produção de combustíveis fósseis por fontes de energia renovável.
                        </Text>
                        <Text
                            fontSize={16}
                            mb={1}
                        >
                            • Opte por produtos retornáveis e recicláveis.</Text>
                        <Text
                            fontSize={16}
                            mb={1}
                        >
                            • Prefira itens cultivados localmente.
                        </Text>
                    </Box>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
}