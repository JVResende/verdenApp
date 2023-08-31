import React, { useState } from "react";
import { Button, HStack, Select, Text, VStack } from "native-base";

export function StepSelect({ text, title, placeholder, value, setValue, data, onPressStep, onPressStepBack, backButton }) {


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
            <Select
                w="full"
                placeholder={placeholder}
                fontSize={16}
                mb={8}
                selectedValue={value}
                onValueChange={itemValue => setValue(itemValue)}
            >
                {data?.map((item, index) => {
                    return (
                        <Select.Item value={item} key={index} label={`${item}`} />
                    );
                })}
            </Select>
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
                        Avançar
                    </Text>
                </Button>
            </HStack>

        </VStack>
    );
}