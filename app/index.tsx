import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("Usuário");
  const [modalVisible, setModalVisible] = useState(false);

  async function carregarDados() {
    const emailSalvo = await AsyncStorage.getItem("email");
    const nomeSalvo = await AsyncStorage.getItem("nome");

    if (emailSalvo) setEmail(emailSalvo);
    if (nomeSalvo) setNome(nomeSalvo);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleSair() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("nome");

    router.replace({ pathname: "/" });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>

      {/* HEADER BONITO */}
      <View
        style={{
          backgroundColor: "#6B8F71",
          padding: 16,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Olá, {nome}
          </Text>
          <Text style={{ color: "#e8f5e9", fontSize: 14 }}>{email}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "#fff",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#6B8F71", fontWeight: "bold" }}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#6B8F71", marginBottom: 16 }}>
        Bem-vindo a Casa Floralles!
      </Text>

      <Text style={{ fontSize: 18, textAlign: "center", marginHorizontal: 24 }}>
        Descubra, cadastre e compartilhe suas plantas.
        Use as abas abaixo para navegar entre cadastro e lista de plantas!
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: "#6B8F71",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center"
        }}
        onPress={handleSair}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Sair desse usuário
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 16,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              Meu Perfil
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 6 }}>
              <Text style={{ fontWeight: "bold" }}>Nome: </Text>
              {nome}
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>E-mail: </Text>
              {email}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#6B8F71",
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
              }}
              onPress={() => {
                setModalVisible(false);
                router.push("/screens/alterarSenha");
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                Alterar senha
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#ccc",
                padding: 12,
                borderRadius: 10,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
