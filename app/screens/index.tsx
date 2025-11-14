import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "../../components/styles";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [editandoNome, setEditandoNome] = useState(false);
  const [novoNome, setNovoNome] = useState("");

  async function handleSair() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("nome");
    router.replace("/");
  }

  useEffect(() => {
    async function carregarDados() {
      const emailSalvo = await AsyncStorage.getItem("email");
      const nomeSalvo = await AsyncStorage.getItem("nome");

      if (emailSalvo) setEmail(emailSalvo);
      if (nomeSalvo) setNome(nomeSalvo);
    }
    carregarDados();
  }, []);

  async function salvarNovoNome() {
    if (novoNome.trim() === "") return;

    await AsyncStorage.setItem("nome", novoNome);
    setNome(novoNome);
    setEditandoNome(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={estiloHeader.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text style={estiloHeader.userNome}>{nome}</Text>
            <Text style={estiloHeader.userEmail}>{email}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={estiloHeader.botaoPerfil}
        >
          <Text style={estiloHeader.textoBotaoPerfil}>Ver Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.container, { marginTop: 100 }]}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 100, height: 100, marginBottom: 16 }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#6B8F71",
          }}
        >
          Bem-vindo à Casa Floralles!
        </Text>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginHorizontal: 24,
          }}
        >
          Descubra, cadastre e compartilhe suas plantas.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSair}>
          <Text style={styles.buttonText}>Sair desse usuário</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={estiloModal.fundo}>
          <View style={estiloModal.modal}>
            {!editandoNome ? (
              <>
                <Text style={estiloModal.nome}>{nome}</Text>

                <TouchableOpacity
                  onPress={() => {
                    setNovoNome(nome);
                    setEditandoNome(true);
                  }}
                  style={estiloModal.botaoEditar}
                >
                  <Text style={estiloModal.txtBotaoEditar}>Editar nome</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  value={novoNome}
                  onChangeText={setNovoNome}
                  style={estiloModal.input}
                />

                <TouchableOpacity
                  style={estiloModal.botaoSalvar}
                  onPress={salvarNovoNome}
                >
                  <Text style={estiloModal.txtSalvar}>Salvar</Text>
                </TouchableOpacity>
              </>
            )}

            <Text style={estiloModal.email}>{email}</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                router.push("/screens/alterarSenha");
              }}
              style={estiloModal.botaoAltSenha}
            >
              <Text style={estiloModal.txtAltSenha}>Alterar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={estiloModal.botaoFechar}
            >
              <Text style={estiloModal.txtFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estiloHeader = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#EAF4EC",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
  },
  userNome: {
    color: "#103517",
    fontWeight: "bold",
    fontSize: 16,
  },
  userEmail: {
    color: "#4A5D52",
    fontSize: 14,
  },
  botaoPerfil: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#6B8F71",
  },
  textoBotaoPerfil: {
    color: "white",
    fontWeight: "bold",
  },
});

const estiloModal = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#103517",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#4A5D52",
    marginBottom: 20,
  },
  botaoEditar: {
    backgroundColor: "#6B8F71",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  txtBotaoEditar: { color: "white", fontWeight: "bold" },
  input: {
    width: "90%",
    backgroundColor: "#EAF4EC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#6B8F71",
  },
  botaoSalvar: {
    backgroundColor: "#6B8F71",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  txtSalvar: { color: "white", fontWeight: "bold" },
  botaoAltSenha: {
    backgroundColor: "#6B8F71",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  txtAltSenha: { color: "white", fontWeight: "bold" },
  botaoFechar: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#103517",
  },
  txtFechar: { color: "#103517", fontWeight: "bold" },
});
