import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export function useRequestData(url, dispatch) {
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    let isMounted = true
    let timeoutId

    const getData = async () => {
      const token = await AsyncStorage.getItem("@token")
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      axios.get(url, { headers: headers })
        .then((response) => {
          if (isMounted) {
            setData(response.data)
            setIsLoading(false)
          }
        })
        .catch((e) => {
          console.log(e)
          if (e.response.data.message == "Token has expired") {
            Alert.alert("Seu login expirou!", "Faça o login novamente.", [
              { text: 'OK', onPress: async () => { navigation.navigate("login"), setShowBackButton(false), await AsyncStorage.setItem("@token", "") } },
            ])
          }
          if (isMounted) {
            setError(error)
            setIsLoading(false)
          }
        })
    }

    if (dispatch) {
      timeoutId = setTimeout(getData, 1000)
    } else {
      getData()
    }

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }

  }, [dispatch, url])

  return [
    data,
    isLoading,
    error,
  ]
}
