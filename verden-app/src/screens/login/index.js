import React, { useState } from "react";
import { VStack, Center, Button, Text, Image, Link, HStack, Toast, Spinner } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import FormInput from "../../components/inputs/FormInput";
import logo from "../../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../constants";


export function Login() {

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const logInSchema = yup.object({
        email: yup.string().required("Insira seu e-mail.").email("E-mail inválido."),
        password: yup.string().required("Insira sua senha.").min(6, "Senha inválida.")
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(logInSchema)
    })

    const handleLogIn = (data) => {
        setIsLoading(true)
        const headers = { 'Content-Type': 'application/json' };
        const body = {
            email: data.email,
            password: data.password
        }

        axios.post(`${BASE_URL}/login`, body, { headers: headers })

            .then((res) => {
                AsyncStorage.setItem("@token", res.data.Token)
                if (res.data.has_company === false) {
                    navigation.navigate("createCompany")
                } else {
                    Toast.show({
                        description: ("Usuário logado com sucesso!"),
                        style: {
                            backgroundColor: "#22c55e",
                        }
                    })
                    setTimeout(() => {
                        navigation.navigate("home")
                    }, 1000);

                }
                setIsLoading(false)
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    Toast.show({
                        title: 'Ocorreu algum erro.',
                        description: ("Favor verificar se seu E-mail ou Senha estão corretos."),
                        style: {
                            backgroundColor: "red"
                        }
                    })
                } else {
                    Toast.show({
                        title: 'Ocorreu algum erro.',
                        description: ("Por favor, tente novamente mais tarde."),
                        style: {
                            backgroundColor: "red"
                        }
                    })
                }
            })
        setIsLoading(false)
    }

    return (
        <NativeBaseProvider>
            <VStack flex={1} safeArea mt={16} px={8}>
                <Image source={logo} size={64} resizeMode="contain" alt="logo" alignSelf="center" my={-6} />
                <Center>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <FormInput
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                                errorMessage={errors.email?.message}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <FormInput
                                label="Senha"
                                placeholder="Digite sua senha"
                                errorMessage={errors.password?.message}
                                onChangeText={onChange}
                                passwordInput={true}
                            />
                        )}
                    />
                    <Link
                        alignSelf="flex-start"
                        mb={6}
                        onPress={() => navigation.navigate("forgotPassword")}
                        isExternal _text={{
                            color: "#00875F"
                        }} >Esqueceu sua senha?</Link>
                    <Button
                        width="full"
                        h={16}
                        bg="#00875F"
                        _pressed={{
                            bgColor: "#02583f"
                        }}
                        onPress={handleSubmit(handleLogIn)}
                    >
                        <Text
                            fontSize="md"
                            color="white"
                        >
                            {isLoading ? <Spinner size="lg" /> : <>Entrar</>}
                        </Text>
                    </Button>
                    <HStack mt={3}>
                        <Text>Não possui uma conta? </Text>
                        <Link
                            onPress={() => navigation.navigate("signup")}
                            isExternal _text={{
                                color: "#00875F"
                            }} >Cadastre-se</Link>
                    </HStack>
                </Center>
            </VStack>
        </NativeBaseProvider>
    );
}