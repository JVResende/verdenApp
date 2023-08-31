import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Center, HStack, Image, NativeBaseProvider, ScrollView, Spinner, Text, Toast, VStack } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../constants";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../components/inputs/FormInput";
import { Feather } from "@expo/vector-icons";
import { GlobalStateContext } from "../../global/globalStateContext";

export function Profile() {

    useProtectedPage()

    const { resetPage } = useContext(GlobalStateContext)

    const [companies, setCompanies] = useState([])
    const [companyId, setCompanyId] = useState([])

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    const [isLoading, setIsLoading] = useState(false)

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
                    console.log(e.message)
                });
        }

        const getUser = async () => {
            const token = await AsyncStorage.getItem("@token")
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            axios.get(`${BASE_URL}/user/authenticated`, { headers: headers })
                .then((res) => {
                    setUserName(res.data.name)
                    setEmail(res.data.email)
                })
                .catch(e => {
                    console.log(e.message)
                });
        }

        getUser()
        getCompanies()

    }, [resetPage])


    const changePasswordSchema = yup.object({
        oldPassword: yup.string().required("Insira sua senha atual.").min(6, "Senha inválida."),
        newPassword: yup.string().required("Insira sua nova senha.").min(6, "Senha inválida."),
    })


    const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        resolver: yupResolver(changePasswordSchema)
    })

    const handleChange = async (data) => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem("@token")
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        const body = {
            old_password: data.oldPassword,
            new_password: data.newPassword
        }

        axios.post(`${BASE_URL}/change/password`, body, { headers: headers })

            .then((res) => {
                Toast.show({
                    title: 'Pronto!',
                    description: 'Senha alterada com sucesso!',
                    style: {
                        backgroundColor: "#22c55e",
                    }
                })
                reset()
            })

            .catch((e) => {
                Toast.show({
                    title: 'Ocorreu algum erro.',
                    description: e.message,
                    style: {
                        backgroundColor: "red"
                    }
                })
            })
        setIsLoading(false)
    }


    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack
                    flex={1}
                    safeArea
                    mt={6}
                    px={8}
                >
                    <HStack alignItems="center" >
                        <Image
                            source={require("../../../assets/profile-image-black.jpg")}
                            style={{ width: 70, height: 70, borderRadius: 40, borderWidth: 3, borderColor: "black" }}
                            alt="foto de perfil"
                        />
                        <VStack>
                            <Text
                                style={{ fontSize: 20, fontWeight: 800, marginLeft: 24 }}
                            >
                                {userName}
                            </Text>
                            <Text
                                style={{ fontSize: 16, marginLeft: 24, marginTop: 4, color: "#363636" }}
                            >
                                {email}
                            </Text>
                        </VStack>
                    </HStack>
                    <VStack
                        backgroundColor="#FFF"
                        borderRadius={8}
                        padding={4}
                        marginVertical={32}
                        shadow={2}
                    >
                        <Text
                            fontSize={16}
                            fontWeight="bold"
                            alignSelf="center"
                            marginBottom={4}
                        >
                            Empresas Cadastradas
                        </Text>
                        {companies.map(company => {
                            return (
                                <Box key={company.id}>
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text
                                            fontSize={16}
                                            marginY={4}
                                        >
                                            {company.corporate_name}
                                        </Text>
                                        {companyId.includes(company.id) ?
                                            <Feather
                                                name="minus-circle"
                                                size={24}
                                                color="#00875F"
                                                onPress={() => {
                                                    setCompanyId(companyId.filter(function (id) {
                                                        return id !== company.id
                                                    }))
                                                }} /> :
                                            <Feather
                                                name="plus-circle"
                                                size={24}
                                                color="#00875F"
                                                onPress={() => {
                                                    setCompanyId([...companyId, company.id])
                                                }} />
                                        }

                                    </HStack>
                                    {companyId.includes(company.id) &&
                                        <VStack>
                                            <Text
                                                fontSize={16}
                                                marginBottom={2}
                                            >
                                                • E-mail: {company.corporate_email}
                                            </Text>
                                            <Text
                                                fontSize={16}
                                                marginBottom={2}
                                            >
                                                • CNPJ: {company.cnpj}
                                            </Text>
                                            <Text
                                                fontSize={16}
                                                marginBottom={2}
                                            >
                                                • Cidade: {company.city}/{company.state}
                                            </Text>
                                            <Text
                                                fontSize={16}
                                                marginBottom={2}
                                            >
                                                • Endereço: {company.address} - {company.number}
                                            </Text>
                                            <Text
                                                fontSize={16}
                                                marginBottom={2}
                                            >
                                                • Telefone: {company.commercial_phone}
                                            </Text>
                                        </VStack>
                                    }
                                </Box>
                            );
                        })}
                    </VStack>

                    <VStack
                        backgroundColor="#FFF"
                        borderRadius={8}
                        padding={4}
                        mb={8}
                        shadow={2}
                        >
                        <Text
                            fontSize={16}
                            mb={8}
                            fontWeight="bold"
                            alignSelf="center"
                        >
                            Edite suas informações aqui
                        </Text>
                        <Center>
                            <Controller
                                control={control}
                                name="oldPassword"
                                render={({ field: { onChange } }) => (
                                    <FormInput
                                        label="Senha atual"
                                        placeholder="Digite a senha atual"
                                        errorMessage={errors.oldPassword?.message}
                                        onChangeText={onChange}
                                        passwordInput={true}
                                        passwordValue={getValues("oldPassword")}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field: { onChange } }) => (
                                    <FormInput
                                        label="Nova senha"
                                        placeholder="Digite a nova senha"
                                        errorMessage={errors.newPassword?.message}
                                        onChangeText={onChange}
                                        passwordInput={true}
                                        passwordValue={getValues("newPassword")}
                                    />
                                )}
                            />
                            <Button
                                width="full"
                                h={16}
                                bg="#00875F"
                                _pressed={{
                                    bgColor: "#02583f"
                                }}
                                onPress={handleSubmit(handleChange)}
                            >
                                <Text
                                    fontSize="md"
                                    color="white"
                                >
                                    {isLoading ? <Spinner size="lg" /> : <>Alterar senha</>}
                                </Text>
                            </Button>
                        </Center>
                    </VStack>
                </VStack>
            </ScrollView >

        </NativeBaseProvider >
    );
}