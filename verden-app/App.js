import 'react-native-gesture-handler';
import React from "react";
import { Routes } from "./src/routes";
import { Platform, NativeModules } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalState } from './src/global/globalState';

export default function App() {
  const { StatusBarManager } = NativeModules;


  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
    }}>
      <GlobalState>
        <Routes />
      </GlobalState>
    </SafeAreaView>

  );
}