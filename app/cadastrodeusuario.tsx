import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const api = "https://floralles-api.vercel.app";

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    fetch(api + "/register", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({nome, email, password: senha }) })
      .then(response => response.status )
      .then(response => {
        if (response != 200) {
          Alert.alert("Erro", "Erro ao cadastrar usuário!");
          return;
        } else {
          Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
          router.replace({ pathname: "/" });
        }
      })
      .catch(err => Alert.alert("Erro", err));
  };

  const handleVoltarLogin = () => {
    router.replace("/");
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 16 }}
        resizeMode="contain"
      />

      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleVoltarLogin}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#6B8F71",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#6B8F71",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#6B8F71",
    fontSize: 16,
  },
});
