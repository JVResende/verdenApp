import React, { useState } from "react";
import { VStack, Center, Button, Text, Toast, Spinner } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import FormInput from "../../components/inputs/FormInput";
import axios from "axios";
import { BASE_URL } from "../../constants";


export function ResetPassword() {

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const resetPasswordSchema = yup.object({
        email: yup.string().required("Insira seu e-mail.").email("E-mail inválido."),
        password: yup.string().required("Insira sua nova senha.").min(6, "Senha inválida."),
        confirm: yup.string().required("Insira a corfirmação da sua nova senha.").oneOf([yup.ref('password'), null], "As senhas não são iguais.")
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    })

    const handleReset = (data) => {
        setIsLoading(true)
        const headers = { 'Content-Type': 'application/json' }
        const body = {
            email: data.email,
            password: data.password,
            token: ''
        }

        axios.post(`${BASE_URL}/password/reset`, body, { headers: headers })

            .then((res) => {
                Toast.show({
                    title: 'Pronto!',
                    description: 'Senha alterada com sucesso!',
                    style: {
                        backgroundColor: "#22c55e",
                    }
                })
                setTimeout(() => {
                    navigation.navigate("login")
                }, 1000);
            })
            .catch((e) => {
                Toast.show({
                    title: 'Ocorreu algum erro.',
                    description: ("Não foi possível redefinir sua senha. Tente novamente ou contate nosso suporte."),
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
            <VStack flex={1} safeArea mt={8} px={8}>
                <Text
                    fontSize={16}
                    mb={8}
                >
                    Preencha os campos abaixo para redefinir sua senha e acessar a plataforma Verden.
                </Text>
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
                                label="Nova senha"
                                placeholder="Mínimo 6 caracteres"
                                errorMessage={errors.password?.message}
                                onChangeText={onChange}
                                passwordInput={true}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirm"
                        render={({ field: { onChange } }) => (
                            <FormInput
                                label="Confirmar nova senha"
                                placeholder="Confirme a senha anterior"
                                errorMessage={errors.confirm?.message}
                                onChangeText={onChange}
                                passwordInput={true}
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
                        onPress={handleSubmit(handleReset)}
                    >
                        <Text
                            fontSize="md"
                            color="white"
                        >
                            {isLoading ? <Spinner size="lg" /> : <>Criar nova senha</>}
                        </Text>
                    </Button>
                </Center>
            </VStack>
        </NativeBaseProvider>
    );
}