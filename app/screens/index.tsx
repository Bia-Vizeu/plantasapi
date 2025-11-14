import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    async function loadUser() {
      const email = await AsyncStorage.getItem("userEmail");
      const name = await AsyncStorage.getItem("userName");
      const photo = await AsyncStorage.getItem("profilePic");

      if (email) setUserEmail(email);
      if (name) {
        setUserName(name);
        setEditingName(name);
      }
      if (photo) setProfilePic(photo);
    }
    loadUser();
  }, []);

  async function selectProfilePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
      await AsyncStorage.setItem("profilePic", uri);
    }
  }

  async function saveName() {
    setUserName(editingName);
    await AsyncStorage.setItem("userName", editingName);
  }

 async function handleSair() {
  await AsyncStorage.removeItem("userEmail");
  await AsyncStorage.removeItem("userName");
  await AsyncStorage.removeItem("profilePic");
  await AsyncStorage.removeItem("token");
  router.replace("/");
}




  function handleAlterarSenha() {
    setModalVisible(false);
    router.push("/screens/alterarSenha");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={selectProfilePhoto}>
            <Image
              source={
                profilePic
                  ? { uri: profilePic }
                  : require("../../assets/images/user.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerUser}>{userName}</Text>
            <Text style={styles.headerUser}>{userEmail}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.viewProfileButton}
        >
          <Text style={styles.viewProfileText}>Ver Perfil</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 140 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100, marginBottom: 16 }}
            resizeMode="contain"
          />

          <Text style={styles.title}>Bem-vindo à Casa Floralles!</Text>
          <Text style={styles.subtitle}>
            Cadastre, visualize e descubra novas plantas.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleSair}>
            <Text style={styles.buttonText}>Sair desse usuário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={selectProfilePhoto}
              style={{ alignItems: "center" }}
            >
              <Image
                source={
                  profilePic
                    ? { uri: profilePic }
                    : require("../../assets/images/user.png")
                }
                style={styles.modalImage}
              />
              <Text style={styles.changePhoto}>
                {profilePic ? "Alterar foto" : "Adicionar foto"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Nome:</Text>
            <TextInput
              value={editingName}
              onChangeText={setEditingName}
              style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={userEmail}
              editable={false}
              style={[styles.input, { backgroundColor: "#DDD" }]}
            />

            <TouchableOpacity
              style={[styles.button, { marginBottom: 8 }]}
              onPress={saveName}
            >
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#6B8F71", marginBottom: 8 }]}
              onPress={handleAlterarSenha}
            >
              <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#B22222" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: "#6B8F71",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    backgroundColor: "#eaeaea",
  },
  headerUser: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  viewProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#6B8F71",
  },
  viewProfileText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#6B8F71",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000070",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eaeaea",
    marginBottom: 6,
  },
  changePhoto: {
    color: "#6B8F71",
    textAlign: "center",
    marginBottom: 14,
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
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
