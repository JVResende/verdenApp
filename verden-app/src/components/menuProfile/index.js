import React, { useEffect, useState } from "react";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import { ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export function MenuProfile() {

    const navigation = useNavigation()

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getUser = async () => {
            const token = await AsyncStorage.getItem("@token")
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            axios.get(`${BASE_URL}/user/authenticated`, { headers: headers })
                .then((res) => {
                    setUserName(res.data.name)
                    setEmail(res.data.email)
                })
                .catch(e => {
                    console.log(e.message)
                })
        }

        getUser()

    }, [])

    const goToProfile = () => {
        navigation.navigate("tabProfile")
    }

    return (

        <ImageBackground
            source={require("../../../assets/background.png")}
            style={{ width: undefined, padding: 16, paddingVertical: 24 }}
        >
            <Pressable onPress={goToProfile}>
                <HStack
                    alignItems="center"
                >
                    <Image
                        source={require("../../../assets/profile-image-black.jpg")}
                        style={{ width: 60, height: 60, borderRadius: 40, borderWidth: 3, borderColor: "black" }}
                        alt="foto de perfil"
                    />
                    <VStack>
                        <Text
                            style={{ color: "#FFF", fontSize: 16, fontWeight: 800, marginHorizontal: 12 }}
                        >
                            {userName}
                        </Text>
                        <Text
                            style={{ color: "rgba(250, 250, 250, 0.8)", fontSize: 12, marginHorizontal: 12 }}
                        >
                            {email}
                        </Text>
                    </VStack>
                </HStack>
            </Pressable>

        </ImageBackground>
    );
}