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


export function ForgotPassword() {

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const forgotPasswordSchema = yup.object({
        email: yup.string().required("Insira seu e-mail.").email("E-mail inválido.")
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    })

    const handleForgot = (data) => {
        setIsLoading(true)
        const body = {
            email: data.email
        }

        axios.post(`${BASE_URL}/send/password/reset/link`, body)

            .then((res) => {
                Toast.show({
                    title: 'Código de alteração enviado!',
                    description: "Enviamos para seu e-mail um código para alteração de senha.",
                    style: {
                        backgroundColor: "#22c55e"
                    }
                })
                setIsLoading(false)
            })
            .catch((e) => {
                setIsLoading(true)
                if (e.response.status === 404) {
                    Toast.show({
                        title: 'E-mail não encontrado',
                        description: "Por favor, verifique se seu e-mail está correto",
                        style: {
                            backgroundColor: "red"
                        }
                    })
                }
                setIsLoading(false)
                console.log(e.response.data.message)
            })
    }

    return (
        <NativeBaseProvider>
            <VStack flex={1} safeArea mt={8} px={8}>
                <Text
                    fontSize={16}
                    mb={8}
                >Informe o e-mail para o qual deseja redefinir a sua senha.
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
                    <Button
                        width="full"
                        h={16}
                        bg="#00875F"
                        _pressed={{
                            bgColor: "#02583f"
                        }}
                        onPress={handleSubmit(handleForgot)}
                    >
                        <Text
                            fontSize="md"
                            color="white"
                        >
                            {isLoading ? <Spinner size="lg" /> : <>Recuperar Senha</>}
                        </Text>
                    </Button>
                </Center>
            </VStack>
        </NativeBaseProvider>
    );
}