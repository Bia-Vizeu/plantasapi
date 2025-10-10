import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../components/styles";


export default function Index() {
  const router = useRouter();
  async function handleSair() {
    await AsyncStorage.removeItem("token");
    router.replace({ pathname: "/" });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 16 }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 16, color: "#6B8F71" }}>
        Bem-vindo a Casa Floralles!
      </Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginHorizontal: 24 }}>
        Descubra, cadastre e compartilhe suas plantas.
        Use as abas abaixo para navegar entre cadastro e lista de plantas!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSair}>
        <Text style={styles.buttonText}>Sair desse usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
