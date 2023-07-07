import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export const useProtectedPage = () => {

    const navigation = useNavigation()

    const getToken = async () => {
        const token = await AsyncStorage.getItem("@token")

        if (!token) {
            navigation.navigate("welcome")
        }
    }

    useEffect(() => {

        getToken()

    }, [navigation.navigate])
}