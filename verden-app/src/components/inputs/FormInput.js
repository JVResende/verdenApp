import React from "react";
import { FormControl, Icon, Pressable, Input } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function FormInput(
    { label, placeholder, errorMessage, onChangeText, passwordInput, cpf, phone, cpfValue, phoneValue, cnpj, cnpjValue, number, cep, cepValue, passwordValue }
) {

    const invalid = !!errorMessage

    const [show, setShow] = React.useState(false)


    return (
        <FormControl mb={4} isRequired={true} isInvalid={invalid}>
            <FormControl.Label fontSize="md">{label}</FormControl.Label>
            <Input
                maxLength={(cpfValue && 14) || (phoneValue && 15) || (cnpjValue && 18) || (cepValue && 9)}
                value={
                    (cpfValue && cpfValue.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4')) ||
                    (phoneValue && phoneValue.replace(/\D+/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')) ||
                    (cnpjValue && cnpjValue
                        .replace(/\D+/g, '')
                        .replace(/(\d{2})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d)/, '$1/$2')
                        .replace(/(\d{4})(\d)/, '$1-$2')
                        .replace(/(-\d{2})\d+?$/, '$1')
                    ) ||
                    (cepValue && cepValue.replace(/(\d{5})(\d)/, '$1-$2')) ||
                    (passwordValue && passwordValue)

                }
                keyboardType={(cpf || phone || cnpj || cep || number) && "numeric"}
                placeholder={placeholder}
                onChangeText={onChangeText}
                fontSize="md"
                h={16}
                borderColor="gray.400"
                _focus={{
                    bg: "blue.100",
                    borderColor: "blue.400",
                    borderWidth: 2
                }}
                isInvalid={invalid}
                _invalid={{
                    borderColor: "red.500",
                    borderWidth: 2
                }}
                type={passwordInput && (show ? "text" : "password")}
                InputRightElement={passwordInput &&
                    <Pressable
                        onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                            size={5}
                            mr="2"
                            color="muted.400" />
                    </Pressable>}
            />
            <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        </FormControl>

    );
}