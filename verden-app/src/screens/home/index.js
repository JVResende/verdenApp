import React, { useEffect, useState, useContext } from "react";
import { NativeBaseProvider, ScrollView, VStack, Text, Select } from "native-base";
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
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
}