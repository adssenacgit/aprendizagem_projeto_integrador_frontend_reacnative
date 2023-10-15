import React from "react";
import { Stack } from "expo-router";

export default () => (
  <Stack screenOptions={{ headerShown: true }}>
    <Stack.Screen name="index" options={{ title: "Próximas Atividades" }} />
    <Stack.Screen name="[id]" options={{ title: "Atividade" }} />
  </Stack>
);
