import React, { useState } from "react";
import { VStack, Center, Button, Text, Toast, Spinner, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import FormInput from "../../components/inputs/FormInput";
import axios from "axios";
import { BASE_URL } from "../../constants";

export function CreateCompany() {

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)

    const createCompanySchema = yup.object({
        name: yup.string().required("Insira seu nome."),
        cnpj: yup.string().required("Insira seu cnpj.").matches(/^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/, "CNPJ inválido."),
        email: yup.string().required("Insira seu e-mail.").email("E-mail inválido."),
        cep: yup.string().required("Insira seu cep.").matches(/^\d{2}\d{3}[-]\d{3}$/gm, "CEP inválido."),
        address: yup.string().required("Insira seu endereço."),
        number: yup.string().required("Insira seu número.").matches(/^[0-9]*$/, "Número inválido."),
        city: yup.string().required("Insira sua cidade."),
        state: yup.string().required("Insira seu estado."),
        phone: yup.string().required("Insira seu telefone.").matches(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/, "Telefone inválido."),
        voucher: yup.string().required("Insira seu voucher."),
    })

    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(createCompanySchema)
    })

    const handleCompanySignUp = (data) => {
        setIsLoading(true)
        const headers = { 'Content-Type': 'application/json' };
        const body = {
            cnpj: data.cnpj,
            corporate_email: data.email,
            corporate_name: data.name,
            address: data.address,
            number: data.number,
            postal_code: data.cep,
            city: data.city,
            state: data.state,
            country: "Brasil",
            commercial_phone: data.phone,
            voucher: data.voucher
        }

        axios.post(`${BASE_URL}/api/register/company`, body, { headers: headers })

            .then((res) => {
                Toast.show({
                    title: 'Pronto!',
                    description:
                        'O cadastro foi realizado com sucesso.',
                    style: {
                        backgroundColor: "#22c55e",
                    }
                })                
                setTimeout(() => {
                    navigation.navigate("home")
                }, 1000);
                setIsLoading(false)
            })
            .catch((e) => {
                Toast.show({
                    title: 'Ocorreu algum erro.',
                    description: ("O CPF ou CNPJ que você informou já está cadastrado no sistema ou é inválido"),
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
                    <Text
                        fontSize={16}
                        mb={4}
                    >Para finalizar seu cadastro no aplicativo do Verden, cadastre a empresa na qual você é representante.
                    </Text>
                    <Center>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Razão Social"
                                    placeholder="Digite o nome da empresa"
                                    errorMessage={errors.name?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="cnpj"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="CNPJ"
                                    placeholder="00.000.000/000-00"
                                    errorMessage={errors.cnpj?.message}
                                    onChangeText={onChange}
                                    cnpj={true}
                                    cnpjValue={getValues("cnpj")}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="E-mail Corporativo"
                                    placeholder="exemplo@email.com"
                                    errorMessage={errors.email?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="cep"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="CEP"
                                    placeholder="00000-000"
                                    errorMessage={errors.cep?.message}
                                    onChangeText={onChange}
                                    cep={true}
                                    cepValue={getValues("cep")}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="address"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Endereço"
                                    placeholder="Digite o endereço da empresa"
                                    errorMessage={errors.address?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="number"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Número"
                                    placeholder="Digite o número do endereço"
                                    errorMessage={errors.number?.message}
                                    onChangeText={onChange}
                                    number={true}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="city"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Cidade"
                                    placeholder="Digite a cidade"
                                    errorMessage={errors.city?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="state"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Estado"
                                    placeholder="Digite o estado"
                                    errorMessage={errors.state?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Telefone Comercial"
                                    placeholder="(00) 00000-0000"
                                    errorMessage={errors.phone?.message}
                                    onChangeText={onChange}
                                    phone={true}
                                    phoneValue={getValues("phone")}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="voucher"
                            render={({ field: { onChange } }) => (
                                <FormInput
                                    label="Voucher"
                                    placeholder="Digite o voucher"
                                    errorMessage={errors.voucher?.message}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Text
                            width="100%"
                            fontSize={14}
                            mb={4}
                        >Para solicitar o voucher, procure junto a sua federação onde sua empresa de transporte faz parte ou parceiros representantes da Celo4 | Earth.
                        </Text>
                        <Button
                            width="full"
                            h={16}
                            mb={4}
                            bg="#00875F"
                            _pressed={{
                                bgColor: "#02583f"
                            }}
                            onPress={handleSubmit(handleCompanySignUp)}
                        >
                            <Text
                                fontSize="md"
                                color="white"
                            >
                                {isLoading ? <Spinner size="lg" /> : <>Cadastrar</>}
                            </Text>
                        </Button>
                    </Center>
                </VStack>
            </ScrollView>

        </NativeBaseProvider>
    );
}