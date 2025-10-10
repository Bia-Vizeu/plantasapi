import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela de Login (deve ser a primeira) */}
      <Stack.Screen name="index" options={{ title: "Login" }} />
      
      {/* Cadastro */}
      <Stack.Screen name="cadastrodeusuario" options={{ title: "Cadastre-se" }} />

      {/* Telas internas */}
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}