import React, { useContext, useState } from "react";
import { Button, HStack, Text, VStack } from "native-base";
import { GlobalStateContext } from "../../global/globalStateContext";
import { AntDesign } from '@expo/vector-icons';

export function ExpressCalculationCard() {

    const { storedCalculations, setStoredCalculations } = useContext(GlobalStateContext)

    const clearItemTable = (item) => {
        const newStoredCalculations = [...storedCalculations];
        newStoredCalculations.splice(item, 1);
        setStoredCalculations(newStoredCalculations);
    }

    return (
        <VStack w="full">
            {storedCalculations.map((item, index) => (
                <HStack key={index} w="100%" alignItems="center" backgroundColor="#FFF" shadow={2} paddingLeft={4} py={2} borderRadius={2} mb={3}>
                    <VStack w="40%" mr={15} >
                        <Text>{item.category.name}</Text>
                        <Text
                            color="#757575"
                            fontSize="xs"
                        >
                            {item.subcategory.name}
                        </Text>
                    </VStack>
                    <Text w="40%">{item.year}</Text>
                    <Button
                        size="md"
                        onPress={() => clearItemTable(index)}
                        background="none"
                        fontWeight="bold"
                        rightIcon={<AntDesign name="delete" size={24} color="red" />}
                        alignSelf="flex-end"
                    />
                </HStack>
            ))}
        </VStack>
    );
}