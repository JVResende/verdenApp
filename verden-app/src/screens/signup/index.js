import React, { useState } from "react";
import { VStack, Center, Button, Text, Link, HStack, Toast, Spinner, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import FormInput from "../../components/inputs/FormInput";
import axios from "axios";
import { BASE_URL } from "../../constants";

export function Signup() {

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const signupSchema = yup.object({
        name: yup.string().required("Insira seu nome."),
        email: yup.string().required("Insira seu e-mail.").email("E-mail inválido."),
        password: yup.string().required("Insira sua senha.").min(6, "Senha inválida."),
        phone: yup.string().required("Insira seu telefone.").matches(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/, "Telefone inválido."),
        cpf: yup.string().required("Insira seu cpf.").matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/g, "CPF inválido.")
    })

    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    })

    const handleSignup = (data) => {
        setIsLoading(true)
        const headers = { 'Content-Type': 'application/json' }
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone_number: data.phone,
            document_number: data.cpf
        }

        axios.post(`${BASE_URL}/users`, body, { headers: headers })

            .then((res) => {
                Toast.show({
                    title: 'Pronto!',
                    description:
                        'Enviamos um link de confirmação para o seu e-mail. Para prosseguir, basta clicar no link enviado.',
                    style: {
                        backgroundColor: "#22c55e",
                    }
                })
                setIsLoading(false)
                setTimeout(() => {
                    navigation.navigate("login")
                }, 1000);
            })
            .catch((e) => {
                Toast.show({
                    title: 'Ocorreu algum erro.',
                    description: ("Não foi possível realizar o cadastro. Tente novamente ou contate nosso suporte."),
                    style: {
                        backgroundColor: "red"
                    }
                })
                console.log(e)
            })
        setIsLoading(false)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack flex={1} safeArea mt={8} px={8}>
                    <Center>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Nome Completo"
                                    placeholder="Nome e sobrenome"
                                    errorMessage={errors.name?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="E-mail"
                                    placeholder="exemplo@email.com"
                                    errorMessage={errors.email?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="CPF"
                                    placeholder="000.000.000-00"
                                    errorMessage={errors.cpf?.message}
                                    onChangeText={onChange}
                                    cpf={true}
                                    cpfValue={getValues("cpf")}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Senha"
                                    placeholder="Mínimo 6 caracteres"
                                    errorMessage={errors.password?.message}
                                    onChangeText={onChange}
                                    passwordInput={true}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Telefone para contato"
                                    placeholder="(00) 00000-0000"
                                    errorMessage={errors.phone?.message}
                                    onChangeText={onChange}
                                    phone={true}
                                    phoneValue={getValues("phone")}
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
                            onPress={handleSubmit(handleSignup)}
                        >
                            <Text
                                fontSize="md"
                                color="white"
                            >
                                {isLoading ? <Spinner size="lg" /> : <>Prosseguir</>}
                            </Text>
                        </Button>

                        <HStack mt={3}>
                            <Text>Já possui uma conta? </Text>
                            <Link
                                mb={4}
                                onPress={() => navigation.navigate("login")} isExternal _text={{
                                    color: "#00875F"
                                }} >Fazer Login</Link>
                        </HStack>
                    </Center>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
}