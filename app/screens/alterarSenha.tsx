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
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [senhaSalva, setSenhaSalva] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      const emailSalvo = await AsyncStorage.getItem("userEmail");
      const senha = await AsyncStorage.getItem("userPassword"); // senha salva
      if (emailSalvo) setEmail(emailSalvo);
      if (senha) setSenhaSalva(senha);
    }
    carregarDados();
  }, []);

  async function alterarSenha() {
    // valida campos
    if (!senhaNova || !senhaConfirm) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // se houver senha antiga salva, verifica
    if (senhaSalva && senhaAtual !== senhaSalva) {
      Alert.alert("Erro", "Senha atual incorreta");
      return;
    }

    if (senhaNova !== senhaConfirm) {
      Alert.alert("Erro", "As senhas novas não coincidem");
      return;
    }

    // salva nova senha
    await AsyncStorage.setItem("userPassword", senhaNova);
    Alert.alert("Sucesso", "Senha alterada com sucesso!");

    // limpa campos
    setSenhaAtual("");
    setSenhaNova("");
    setSenhaConfirm("");

    router.back(); // volta para a tela anterior
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{email}</Text>

      {senhaSalva && (
        <>
          <Text style={styles.label}>Senha Atual:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={senhaAtual}
            onChangeText={setSenhaAtual}
          />
        </>
      )}

      <Text style={styles.label}>Nova Senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senhaNova}
        onChangeText={setSenhaNova}
      />

      <Text style={styles.label}>Confirme a Nova Senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senhaConfirm}
        onChangeText={setSenhaConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={alterarSenha}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#B22222" }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B8F71",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#6B8F71",
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
  },
});
