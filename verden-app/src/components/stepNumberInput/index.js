import React, { useState } from "react";
import { Button, HStack, Input, Text, VStack } from "native-base";

export function StepNumberInput({ text, title, placeholder, value, setValue, onPressStep, onPressStepBack, backButton, mileageInput }) {


    return (
        <VStack w="100%">
            <Text
                fontSize={14}
                mb={6}
            >
                {text}
            </Text>
            <Text
                fontSize={16}
                mb={4}
                fontWeight="bold"
            >
                {title}
            </Text>
            <Input
                w="full"
                placeholder={placeholder}
                fontSize={16}
                mb={8}
                type="number"
                keyboardType="numeric"
                value={value}
                onChangeText={mileageInput ? text => setValue(text.replace(/\D/g, '').replace(/(\d)(\d{1})$/, '$1,$2'),) : text => setValue(text)}
            />
            <HStack width="full" justifyContent={backButton ? "space-between" : "flex-end"}>
                {backButton ?
                    (<Button
                        width="47%"
                        h={16}
                        borderWidth="1"
                        borderColor="#00875F"
                        bg="whitesmoke"
                        _pressed={{
                            bgColor: "gray.200"
                        }}
                        onPress={onPressStepBack}
                    >
                        <Text
                            fontSize="md"
                            color="#00875F"
                        >
                            Voltar
                        </Text>
                    </Button>) : null}
                <Button
                    isDisabled={value === ""}
                    width="47%"
                    h={16}
                    bg="#00875F"
                    _pressed={{
                        bgColor: "#02583f"
                    }}
                    onPress={onPressStep}
                >
                    <Text
                        fontSize="md"
                        color="white"
                    >
                        {mileageInput ? "Concluir" : "Avançar"}
                    </Text>
                </Button>
            </HStack>

        </VStack>
    );
}