import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Login screen (first shown) */}
      <Stack.Screen name="login" options={{ title: "Login" }} />

      {/* Cadastro de usuário (stack) */}
      <Stack.Screen name="cadastrodeusuario" options={{ title: "Cadastre-se" }} />

      {/* Depois do login, o usuário acessa as screens (pasta app/screens) */}
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}