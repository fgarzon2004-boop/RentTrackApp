import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="apartment/[id]" />
          <Stack.Screen name="edit-profile" options={{ presentation: "modal" }} />
          <Stack.Screen name="my-listings" />
          <Stack.Screen name="apartment-form" options={{ presentation: "modal" }} />
          <Stack.Screen name="chat/[threadId]" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
