import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AlterarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarEmail() {
      try {
        const emailSalvo = await AsyncStorage.getItem("email");
        if (emailSalvo) setEmail(emailSalvo);
      } catch (e) {
        console.log("Erro ao carregar email:", e);
      }
    }
    carregarEmail();
  }, []);

  async function handleAlterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A confirmação da senha não confere.");
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter ao menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch("https://floralles-api.vercel.app/alterar-senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email,
          senhaAtual,
          novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Não foi possível alterar a senha.");
        return;
      }

      Alert.alert("Sucesso", "Senha alterada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Alterar Senha</Text>

      {/* Email do usuário */}
      <Text style={styles.userText}>Usuário: {email || "—"}</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Senha atual"
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        style={styles.input}
      />

      <TextInput
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirmar nova senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={styles.input}
      />

      {/* Botão Confirmar */}
      <TouchableOpacity
        style={[styles.primaryButton, loading && { opacity: 0.7 }]}
        onPress={handleAlterarSenha}
        disabled={loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Atualizando..." : "Confirmar"}
        </Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
        <Text style={styles.secondaryButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6B8F71",
    marginBottom: 8,
    textAlign: "center",
  },
  userText: {
    fontSize: 16,
    color: "#103517",
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  primaryButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#6B8F71",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6B8F71",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#6B8F71",
    fontSize: 18,
    fontWeight: "bold",
  },
});
