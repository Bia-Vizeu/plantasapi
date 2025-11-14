import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = "https://floralles-api.vercel.app";
  const router = useRouter();

  const handleLogin = async () => {
    if (nome === "" ||email === "" || password === "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    fetch(api + "/login", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome, email, password }) })
      .then(response => response.json())
      .then(async response => {
        if (!response.token) {
          Alert.alert("Erro", "Email ou senha inválidos!");
          return;
        } else {
          await AsyncStorage.setItem("token", response.token);
          router.replace({ pathname: "/screens" });
          return;
        }
      })
      .catch(err => console.error(err));

  };

  const handleCadastro = () => {
    router.push({ pathname: "/cadastrodeusuario" });
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const t = await AsyncStorage.getItem("token");
        if (t) {
          console.log("Token encontrado, redirecionando para /screens");
          router.replace("/screens");
        } else {
          console.log("Nenhum token encontrado, mantém na tela de login");
        }
      } catch (e) {
        console.log("Erro ao verificar token:", e);
      }
    };
    checkToken();
  }, []);

  return (

    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCadastro}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
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
