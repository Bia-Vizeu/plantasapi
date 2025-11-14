import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AlterarSenha() {
  const router = useRouter();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAlterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A confirmação não corresponde à nova senha.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const resposta = await fetch("https://floralles-api.vercel.app/usuarios/alterar-senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        Alert.alert("Erro", data?.erro || "Não foi possível alterar a senha.");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso!", "Senha alterada com sucesso!");
      router.back();

    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 24 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", color: "#6B8F71", marginBottom: 20 }}>
        Alterar Senha
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 8 }}>Senha atual</Text>
      <TextInput
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <Text style={{ fontSize: 18, marginBottom: 8 }}>Nova senha</Text>
      <TextInput
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <Text style={{ fontSize: 18, marginBottom: 8 }}>Confirmar nova senha</Text>
      <TextInput
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
          marginBottom: 24,
        }}
      />

      <TouchableOpacity
        onPress={handleAlterarSenha}
        disabled={loading}
        style={{
          backgroundColor: "#6B8F71",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          {loading ? "Atualizando..." : "Alterar Senha"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 18,
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
